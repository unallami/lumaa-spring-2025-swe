import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './controllers/authController';
import taskRoutes from './controllers/taskController';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());


app.use(express.json());

// Setup routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});