import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../Message';
import Loader from '../Loader';
import { listBooks, deleteBook, createBook } from '../../actions/bookActions';
import { BOOK_CREATE_RESET } from '../../constants/bookConstant';

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books } = bookList;

  const bookDelete = useSelector((state) => state.bookDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bookDelete;

  const bookCreate = useSelector((state) => state.bookCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    book: createdBook,
  } = bookCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: BOOK_CREATE_RESET });

    if (userInfo.field !== 'ADMIN') {
      history.push('/login');
    }
    if (successCreate) {
      history.push(`/admin/book/${createdBook._id}/edit`);
    } else {
      dispatch(listBooks());
    }
  }, [dispatch, userInfo, history, successDelete, successCreate, createdBook]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure, you want to delete it.')) {
      dispatch(deleteBook(id));
    }
  };

  const BookCreateHandler = (id) => {
    dispatch(createBook());
  };

  return (
    <div className='container-fluid'>
      <Link to='/admin' className='btn btn-secondary my-3'>
        Go Back
      </Link>
      <div className='row align-items-center'>
        <div className='col'>
          <h1>Books</h1>
        </div>
        <div className='col'>
          <button
            className='my-3 btn btn-primary'
            onClick={() => BookCreateHandler()}
          >
            <i className='fas fa-plus'></i> Create Products
          </button>
        </div>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && <Message>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <table className='table table-dark table-hover'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Name</th>
              <th scope='col'>Field</th>
              <th scope='col'>Publisher</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book._id}</td>
                <td>{book.name}</td>
                <td>{book.field}</td>
                <td>{book.publisher}</td>
                <td>
                  <Link to={`/admin/book/${book._id}/edit`}>
                    <button className='btn btn-secondary btn-sm'>
                      <i className='fas fa-edit'></i>
                    </button>
                  </Link>
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => deleteHandler(book._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductListScreen;
