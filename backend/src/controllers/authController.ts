import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../utils/db';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET as string;

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
        [username, hashedPassword]
      );
      res.status(201).json(result.rows[0]);
    } catch (error: any) {
      console.error(error);
   
      if (error.code === '23505') {
        res.status(400).json({ error: 'Username already exists' });
      } else {
        res.status(500).json({ error: 'Registration failed' });
      }
    }
  });
  

  router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = result.rows[0];
      if (!user) {
        res.status(400).json({ error: 'Invalid credentials' });
        return;
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(400).json({ error: 'Invalid credentials' });
        return;
      }
  
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed' });
    }
  });
  

export default router;
