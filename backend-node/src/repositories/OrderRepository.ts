import { Client } from '@elastic/elasticsearch';
import { type Order } from '../types.js';
import { config } from '../../config.js';
import orderMapping from '../../../infrastructure/orderMapping.js';

export class OrderRepository {
    private client: Client;
    private indexName: string;

    constructor(client: Client) {
        this.client = client;
        this.indexName = config.elastic.index;
    }

    async initializeIndex(): Promise<void> {
        const exists = await this.client.indices.exists({ index: this.indexName });
        if (!exists) {
            await this.client.indices.create({
                index: this.indexName,
                body: orderMapping
            });
        }
    }

    async create(order: Order): Promise<{ id: string }> {
        const orderWithDate = {
            ...order,
            date: new Date()
        };
        const result = await this.client.index({
            index: this.indexName,
            document: orderWithDate,
        });
        return { id: result._id };
    }
}