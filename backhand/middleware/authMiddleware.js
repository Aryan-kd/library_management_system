import User from '../model/userModel.js';
import AsyncHandler from 'express-async-handler';

const protect = AsyncHandler(async (req, res, next) => {
  let uid;
  if (req.headers.authorization) {
    try {
      uid = req.headers.authorization;
      req.user = await User.findOne({ uid }).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not Authorized Member');
    }
  }
  if (!uid) {
    res.status(401);
    throw new Error('Not Authorized');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.field === 'ADMIN') {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized as a Admin');
  }
};

export { protect, admin };
