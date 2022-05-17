import User from '../model/userModel.js';
import asyncHandler from 'express-async-handler';

// Auth user & get token
// route /api/users/login
const authUser = asyncHandler(async (req, res) => {
  const { uid, password } = req.body;
  //   res.send({ uid, password });
  const user = await User.findOne({ uid });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      uid: user.uid,
      email: user.email,
      image: user.image,
      field: user.field,
    });
  } else {
    res.status(401);
    throw new Error('Invalid UID or Password');
  }
});

// Register a new user
// route /api/users
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, uid, password, field } = req.body;

  //   res.send({ uid, password });
  const userExists = await User.findOne({ uid });

  if (userExists) {
    res.status(400);
    throw new Error('UID or User Already Exist');
  }

  const user = await User.create({
    name,
    email,
    uid,
    password,
    field,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      uid: user.uid,
      email: user.email,
      image: user.image,
      field: user.field,
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data/ User not Registered');
  }
});

// GET user profile
// route /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
  // res.send('Success');
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      uid: user.uid,
      email: user.email,
      image: user.image,
      field: user.field,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// GET Update the User
// route /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
  // res.send('Success');
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.uid = req.body.uid || user.uid;
    user.field = req.body.field || user.field;
    user.image = req.body.image || user.image;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      uid: updatedUser.uid,
      email: updatedUser.email,
      image: updatedUser.image,
      field: updatedUser.field,
    });
  } else {
    res.status(404);
    throw new Error('User Not Updated or Found');
  }
});

// GET all Admin
// route /api/users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// GET Delete user
// route /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User Removed' });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// GET User by ID
// route /api/users/:id
const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// GET Update user by admin only
// route /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.uid = req.body.uid || user.uid;
    user.field = req.body.field || user.field;
    user.image = req.body.image || user.image;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      uid: updatedUser.uid,
      email: updatedUser.email,
      image: updatedUser.image,
      field: updatedUser.field,
    });
  } else {
    res.status(404);
    throw new Error('User Not Updated or Found');
  }
});

export {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
};
