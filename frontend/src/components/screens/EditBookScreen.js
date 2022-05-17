import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { listBookDetail, updateBook } from '../../actions/bookActions';
import { BOOK_UPDATE_RESET } from '../../constants/bookConstant';

const EditBookScreen = ({ match, location, history }) => {
  //Book Info
  const bookId = match.params.id;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [upvotes, setUpvotes] = useState(0);
  const [publisher, setPublisher] = useState('');
  const [image, setImage] = useState('/images/default.jpg');
  const [rating, setRating] = useState(0);
  const [pdf, setPdf] = useState('/pdf/a.pdf');
  const [field, setField] = useState('ALL');
  const [uploading, setUploading] = useState(false);

  //Dispatch
  const dispatch = useDispatch();

  //Details
  const bookDetail = useSelector((state) => state.bookDetail);
  const { loading, error, book } = bookDetail;

  //Update
  const bookUpdate = useSelector((state) => state.bookUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bookUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BOOK_UPDATE_RESET });
      history.push('/admin/booklist');
    } else {
      if (!book.name || book._id !== bookId) {
        dispatch(listBookDetail(bookId));
      } else {
        setName(book.name);
        setDescription(book.description);
        setField(book.field);
        setImage(book.image);
        setPdf(book.pdf);
        setPublisher(book.publisher);
        setUpvotes(book.upvotes);
        setRating(book.rating);
      }
    }
  }, [dispatch, book, bookId, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateBook({
        _id: bookId,
        name,
        description,
        image,
        field,
        pdf,
        rating,
        upvotes,
        publisher,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
    // Upload
  };
  return (
    <div className='container-fluid'>
      <Link to='/admin/booklist' className='btn btn-secondary my-3'>
        Go Back
      </Link>
      <div className=' bg-white rounded p-4'>
        <h1 className='text-center text-underline'>
          Library Management System
        </h1>
        <h4 className='text-center'>Edit Book</h4>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message>{errorUpdate}</Message>}
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message className='bg-danger'>{error}</Message>
      ) : (
        <form onSubmit={submitHandler} className='form-login my-3 w-50 mx-auto'>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              <h4 className='text-white'>Name</h4>
            </label>
            <input
              type='text'
              className='form-control'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='Description' className='form-label'>
              <h4 className='text-white'>Description</h4>
            </label>
            <input
              type='text'
              className='form-control'
              id='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Description'
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='Upvotes' className='form-label'>
              <h4 className='text-white'>Upvotes</h4>
            </label>
            <input
              type='number'
              className='form-control'
              id='Upvotes'
              value={upvotes}
              onChange={(e) => setUpvotes(e.target.value)}
              placeholder='Upvotes'
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='Publisher' className='form-label'>
              <h4 className='text-white'>Publisher</h4>
            </label>
            <input
              type='text'
              className='form-control'
              id='Publisher'
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              placeholder='Publisher'
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='Image' className='form-label'>
              <h4 className='text-white'>Image</h4>
            </label>
            <input
              type='text'
              className='form-control'
              id='Image'
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder='Enter Image URL'
              required
            />
            <div className='input-group mb-3'>
              <input
                type='file'
                className='form-control'
                id='inputGroupFile01'
                onChange={uploadFileHandler}
              />
            </div>
            {uploading && <Loader />}
          </div>

          <div className='mb-3'>
            <label htmlFor='Rating' className='form-label'>
              <h4 className='text-white'>Rating</h4>
            </label>
            <input
              type='number'
              className='form-control'
              id='Rating'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder='Rating'
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='Pdf' className='form-label'>
              <h4 className='text-white'>Pdf ID</h4>
            </label>
            <input
              type='text'
              className='form-control'
              id='Pdf'
              value={pdf}
              onChange={(e) => setPdf(e.target.value)}
              placeholder='Enter PDF URL'
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='field' className='form-label'>
              <h4 className='text-white'>Field</h4>
            </label>
            <input
              type='text'
              className='form-control'
              id='field'
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder='CSE/IT/BCA'
              required
            />
          </div>

          <input
            type='submit'
            className='btn btn-warning w-100'
            value='Update'
          />
        </form>
      )}
    </div>
  );
};

export default EditBookScreen;
