import 'dotenv/config';

export const config = {
    elastic: {
        url: process.env.ELASTIC_URL || 'http://localhost:9200',
        index: process.env.ELASTIC_INDEX || 'orders'
    },
    port: process.env.PORT || 3001
};