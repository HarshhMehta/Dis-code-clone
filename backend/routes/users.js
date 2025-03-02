import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Placeholder for future user routes
router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({ message: 'User profile route' });
});

export default router;