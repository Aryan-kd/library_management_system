import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';
import bookRoute from './routes/bookRoute.js';
import userRoute from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import uploadRoute from './routes/uploadRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 80;

connectDB();

app.get('/', (req, res) => {
  res.send('Welcome To Library Management Store Backhand..');
});

app.use('/api/books', bookRoute);
app.use('/api/users', userRoute);
app.use('/api/upload', uploadRoute);

const __dirname = path.resolve();
app.use('/uploades', express.static(path.join(__dirname, '/uploades')));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on Port: http://localhost:${PORT}`);
});
