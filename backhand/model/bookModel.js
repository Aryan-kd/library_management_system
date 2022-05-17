import mongoose from 'mongoose';

const BookSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User',
  },
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    default: '/images/default.jpg',
  },
  description: {
    type: String,
    require: true,
  },
  publisher: {
    type: String,
    require: true,
  },
  pdf: {
    type: String,
    require: true,
  },
  upvotes: {
    type: Number,
    require: true,
    default: 0,
  },
  rating: {
    type: Number,
    require: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  field: {
    type: String,
    require: true,
  },
});

const books = mongoose.model('books', BookSchema);
export default books;
