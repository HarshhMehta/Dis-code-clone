import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    return next(error);
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    error.statusCode = 401;
    error.message = 'Invalid token';
    next(error);
  }
};