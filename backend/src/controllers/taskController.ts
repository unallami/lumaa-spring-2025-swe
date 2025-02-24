import { Router, Request, Response } from 'express';
import { pool } from '../utils/db';
import { verifyToken, AuthRequest } from '../middleware/authMiddleware';

const router = Router();


router.use(verifyToken);

// Fetch tasks for the user
router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const result = await pool.query('SELECT * FROM tasks WHERE "userId" = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not retrieve tasks' });
  }
});

// Create a new task
router.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description } = req.body;
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'INSERT INTO tasks (title, description, "userId") VALUES ($1, $2, $3) RETURNING *',
      [title, description, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create task' });
  }
});

// Update a task
router.put('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, "isComplete" = $3 WHERE id = $4 AND "userId" = $5 RETURNING *',
      [title, description, isComplete, id, userId]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not update task' });
  }
});

// Delete a task
router.delete('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const userId = req.user.id;
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND "userId" = $2 RETURNING *',
      [id, userId]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not delete task' });
  }
});

export default router;
