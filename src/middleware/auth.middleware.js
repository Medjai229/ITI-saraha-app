import jwt from 'jsonwebtoken';

const authToken = (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.status(401).json({ message: 'no token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(400).json({ message: 'invalid token' });
  }
};

export default authToken;
