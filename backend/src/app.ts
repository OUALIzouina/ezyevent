import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import routes from './routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// CORS: origin must be the exact Vercel URL (not '*') because credentials:true
// is required for cookies to be sent cross-domain. '*' + credentials is
// rejected by browsers outright — this combination is the most common cause
// of the CORS errors you've been hitting.
app.use(
  cors({
    origin: "http://localhost:3001", // e.g. https://your-app.vercel.app
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api', routes);

// Must be registered last — after all routes
app.use(errorHandler);

export default app;