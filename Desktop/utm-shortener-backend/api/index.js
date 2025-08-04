import express from 'express';
import dotenv from 'dotenv';
import shortenRoute from '../routes/shorten.js'; // 路徑往上一層

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/shorten', shortenRoute);

export default app;

