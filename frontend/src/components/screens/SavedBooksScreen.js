import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message.js';
import Rating from '../Rating.js';
import {
  addBook,
  removeBook,
  completeBook,
  issueBook,
} from '../../actions/savedListActions';

const SavedBooksScreen = ({ match, location, history }) => {
  const bookId = match.params.id;
  const dispatch = useDispatch();
  // Saved Books
  const savedList = useSelector((state) => state.savedList);
  const { savedBooks } = savedList;

  // Completeded Books
  const completedList = useSelector((state) => state.completedList);
  const { completedBooks } = completedList;

  //Login Info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let UID = userInfo ? userInfo.uid : 'Admin1';

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (bookId) {
      dispatch(addBook(bookId, userInfo.uid));
    }
  }, [bookId, dispatch, history, userInfo]);

  const removeFromListHandler = (id) => {
    dispatch(removeBook(id, UID));
  };

  const issueBookHandler = (id) => {
    dispatch(issueBook(id, UID));
  };

  const completeFromListHandler = (id) => {
    dispatch(completeBook(id, UID));
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-7'>
          <h1 className='text-center my-5'>Saved Books</h1>
          {savedBooks.length === 0 ? (
            <Message children={`Your Cart Is Empty`} />
          ) : (
            <div className='w-100'>
              {savedBooks.map((item) =>
                item.uid === UID ? (
                  <div className='card2 mb-3' key={item.product}>
                    <div className='row'>
                      <Link
                        to={`/book/${item.product}`}
                        className='col-md-2 mx-auto'
                      >
                        <img
                          src={item.image}
                          className='img-fluid rounded-start'
                          alt={item.name}
                        />
                      </Link>
                      <Link
                        to={`/book/${item.product}`}
                        className='col-md-4 my-auto'
                      >
                        <h5 className='text-center text-black fw-bolder my-auto'>
                          {item.name}
                        </h5>
                      </Link>
                      <div className='col-md-2 my-auto mx-auto'>
                        <Rating
                          value={item.rating}
                          text={item.upvotes}
                          flex={'t'}
                        />
                      </div>
                      <div className='col-md-1 my-auto'>
                        <button
                          type='button'
                          className='btn btn-success mx-auto'
                          data-toggle='popover-hover'
                          title='To Mark Complete'
                          onClick={() => {
                            completeFromListHandler(item.product);
                          }}
                        >
                          <i className='fa-solid fa-square-check'></i>
                        </button>
                      </div>
                      <div className='col-md-1 my-auto'>
                        <button
                          type='button'
                          className='btn btn-warning my-3 mx-auto'
                          data-toggle='popover-hover'
                          title='To Issue The Book'
                          onClick={() => {
                            issueBookHandler(item.product);
                          }}
                        >
                          <i className='fa-solid fa-id-card-clip'></i>
                        </button>
                      </div>
                      <div className='col-md-1 my-auto'>
                        <button
                          type='button'
                          className='btn btn-danger my-3 mx-auto'
                          data-toggle='popover-hover'
                          title='To Delete The Book'
                          onClick={() => {
                            removeFromListHandler(item.product);
                          }}
                        >
                          <i className='fas fa-trash'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )
              )}
            </div>
          )}
        </div>
        <div className='col-md-4'>
          <h1 className='text-center my-5'>Completed Books</h1>
          {completedBooks.length === 0 ? (
            <Message children={`Still not completed any book`} />
          ) : (
            <div className='w-100 text-center'>
              {completedBooks.map((item) =>
                item.uid === UID ? <h6 key={item.product}>{item.name}</h6> : ''
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedBooksScreen;
