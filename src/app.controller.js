import authRouter from './modules/auth/auth.controller.js';

const bootstrap = (app, e) => {
  app.use(e.json());

  app.get('/', (req, res) => {
    res.json({ message: 'app is working' });
  });

  app.use('/auth', authRouter);

  app.all('*', (req, res) => {
    return res.status(404).json({ message: 'API not found' });
  });
};

export default bootstrap;
