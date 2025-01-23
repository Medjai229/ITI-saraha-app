import { Router } from 'express';
import User from './service/user.service.js';

// Validate the token from the token

const userRouter = Router();

userRouter.put('/update', User.updateUser);

export default userRouter;
