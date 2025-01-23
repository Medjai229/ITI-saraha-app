import { Router } from 'express';
import Auth from './service/auth.service.js';

const authRouter = Router();

authRouter.post('/register', Auth.register);
authRouter.post('/login', Auth.login);
authRouter.get('/verify/:token', Auth.verify);

export default authRouter;
