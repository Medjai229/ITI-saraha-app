import { Router } from 'express';
import User from './service/user.service.js';
import authToken from '../../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.put('/update', authToken, User.updateUser);
userRouter.put('/changePassword', authToken, User.changePassword);
userRouter.delete('/deleteUser', authToken, User.deleteUser);

export default userRouter;
