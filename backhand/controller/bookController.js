import books from '../model/bookModel.js';
import asyncHandler from 'express-async-handler';

// For All Books
// Route api/books
const getBooks = asyncHandler(async (req, res) => {
  const Books = await books.find({});
  if (Books) {
    res.json(Books);
  } else {
    res.status(404);
    throw new Error('Books Not Found');
  }
});

//For One Product
// Route api/books/?_id
const getBookById = asyncHandler(async (req, res) => {
  const book = await books.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error('Book Not Found');
  }
});

//For Delete Product
// Route api/books/?_id
const deleteBook = asyncHandler(async (req, res) => {
  const book = await books.findById(req.params.id);
  if (book) {
    await book.remove();
    res.json({ message: 'Book Removed' });
  } else {
    res.status(404);
    throw new Error('Book Not Found');
  }
});

//For Create Product
// Route api/books
const createBook = asyncHandler(async (req, res) => {
  const book = new books({
    name: 'Sample Name',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, quis.',
    upvotes: 0,
    publisher: 'Sample',
    rating: 0,
    pdf: '/pdf/a.pdf',
    field: 'NONE',
  });
  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

//For Update Product
// Route api/books/:id
const updateBook = asyncHandler(async (req, res) => {
  const { name, description, upvotes, publisher, rating, pdf, field, image } =
    req.body;

  const book = await books.findById(req.params.id);

  if (book) {
    book.name = name;
    book.description = description;
    book.upvotes = upvotes;
    book.publisher = publisher;
    book.rating = rating;
    book.pdf = pdf;
    book.field = field;
    book.image = image;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error('Book Not Found');
  }
});

export { getBookById, getBooks, deleteBook, createBook, updateBook };
