import { Router } from 'express';
import Message from './service/message.service.js';
import authToken from '../../middleware/auth.middleware.js';

// Validate the user from the token

const messageRouter = Router();

messageRouter.post('/send/:id', Message.sendMessage);
messageRouter.delete('/delete/:msgId', authToken, Message.deleteMessage);
messageRouter.get('/', authToken, Message.getAllMessages);
messageRouter.get('/:msgId', authToken, Message.getMessage);

export default messageRouter;
