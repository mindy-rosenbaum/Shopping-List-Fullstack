import { Client } from '@elastic/elasticsearch';
import 'dotenv/config';
import { config } from '../config.js';

const client = new Client({
  node: config.elastic.url,
});

export default client;