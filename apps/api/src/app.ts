import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import clientsRoutes from './routes/clients';
import projectsRoutes from './routes/projects';
import statsRoutes from './routes/stats';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/stats', statsRoutes);

app.use(errorHandler);

export default app;
