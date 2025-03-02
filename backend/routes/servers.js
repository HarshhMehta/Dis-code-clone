import express from 'express';
import { createServer, getUserServers, joinServer, createInviteCode } from '../controllers/serverController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, createServer);
router.get('/', verifyToken, getUserServers);
router.post('/join', verifyToken, joinServer);
router.post('/:serverId/invite', verifyToken, createInviteCode);

export default router;