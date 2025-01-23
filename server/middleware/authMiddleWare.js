import jwt from 'jsonwebtoken';

const authMiddleWare = (req, res, next) => {
  
  const token = req.headers['authorization']?.split(' ')[1]; 
  
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();

  } catch (error) {

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }

  }
};

export default authMiddleWare;
