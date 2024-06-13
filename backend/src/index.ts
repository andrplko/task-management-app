import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connectToDatabase } from './services/database.service';
import todo from './routes/todo.router';
import { Connection } from './types';

config();

const PORT = process.env.PORT || 3000;

export let connection: Connection;

(async () => {
  connection = await connectToDatabase();
})();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/todo', todo);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
