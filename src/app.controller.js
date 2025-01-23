import authRouter from './modules/auth/auth.controller.js';
import userRouter from './modules/user/user.controller.js';
import messageRouter from './modules/message/message.controller.js';

const bootstrap = (app, e) => {
  app.use(e.json());

  app.get('/', (req, res) => {
    res.json({ message: 'app is working' });
  });

  app.use('/auth', authRouter);
  app.use('/user', userRouter);
  app.use('/message', messageRouter);

  app.all('*', (req, res) => {
    return res.status(404).json({ message: 'API not found' });
  });
};

export default bootstrap;
