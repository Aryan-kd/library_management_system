import express from 'express';
import {
  getBookById,
  getBooks,
  deleteBook,
  createBook,
  updateBook,
} from '../controller/bookController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Fetching All Products
router.route('/').get(getBooks).post(protect, admin, createBook);

// Fetching Single Product and Removing It
router
  .route('/:id')
  .get(getBookById)
  .delete(protect, admin, deleteBook)
  .put(protect, admin, updateBook);

export default router;
