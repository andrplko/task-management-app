import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import todo from './routes/todo.router';
import auth from './routes/auth.router';
import user from './routes/user.router';
import { Connection } from './types';
import morganMiddleware from './middlewares/morgan.middleware';
import logger from './config/logger';
import swagger from './config/swagger';
import { connectToDatabase } from './config/database';

config();

const PORT = process.env.PORT || 3000;

export let connection: Connection;

(async () => {
  connection = await connectToDatabase();
})();

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);
swagger(app);

app.use('/auth', auth);
app.use('/user', user);
app.use('/todo', todo);

app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT} 🚀🚀🚀`);
});
