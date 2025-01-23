import { Router } from 'express';
import Auth from './service/auth.service.js';
import { validation } from '../../utils/validation.js';
import {
  signInValidationSchema,
  signUpValidationSchema,
} from './auth.validation.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const authRouter = Router();

authRouter.post(
  '/register',
  upload.single('profileImage'),
  validation(signUpValidationSchema),
  Auth.register
);
authRouter.post('/login', validation(signInValidationSchema), Auth.login);
authRouter.get('/verify/:token', Auth.verify);

export default authRouter;
