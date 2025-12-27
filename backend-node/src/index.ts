import express, { type Request, type Response } from 'express';
import cors from 'cors';
import client from './elasticClient.js';
import { OrderRepository } from './repositories/OrderRepository.js';
import { OrderService } from './services/OrderService.js';
import { OrderController } from './controllers/OrderController.js';
import { errorHandler } from './middleware/errorHandler.js';
import { config } from '../config.js';

const app = express();
const PORT = config.port;

// Initialize layers
const orderRepository = new OrderRepository(client);
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});
// Health check
app.get('/health', async (req: Request, res: Response) => {
    try {
        const health = await client.cluster.health({});
        res.json({ status: 'UP', elastic: health });
    } catch (error) {
        res.status(500).json({ status: 'DOWN', error });
    }
});

// Create order
app.post('/api/orders', orderController.createOrder);

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    
    await orderRepository.initializeIndex();
    console.log("Elasticsearch ready");
});