import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBooks } from '../../actions/bookActions';
import BookCard from '../BookCard';
import Loader from '../Loader';
import Message from '../Message';

const BooksScreen = ({ location, history }) => {
  const [radio, setRadio] = useState('ALL');

  // Login Info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (!userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  // Fetching Books
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books } = bookList;
  useEffect(() => {
    dispatch(listBooks());
  }, [dispatch]);

  return (
    <div className='container-fluid'>
      <div className='text-center container my-3 py-2 justify-content-around align-items-center border'>
        <h4 className='py-2'>Select Which Field Book Interest You</h4>
        <div className='form-check form-check-inline mx-5'>
          <input
            className='form-check-input'
            type='radio'
            onClick={(e) => setRadio(e.target.value)}
            name='inlineRadioOptions'
            id='inlineRadio1'
            value='ALL'
          />
          <label className='form-check-label' htmlFor='inlineRadio1'>
            ALL
          </label>
        </div>
        <div className='form-check form-check-inline mx-5'>
          <input
            className='form-check-input'
            type='radio'
            onClick={(e) => setRadio(e.target.value)}
            name='inlineRadioOptions'
            id='inlineRadio2'
            value='CSE'
          />
          <label className='form-check-label' htmlFor='inlineRadio2'>
            CSE
          </label>
        </div>
        <div className='form-check form-check-inline mx-5'>
          <input
            className='form-check-input'
            type='radio'
            onClick={(e) => setRadio(e.target.value)}
            name='inlineRadioOptions'
            id='inlineRadio3'
            value='IT'
          />
          <label className='form-check-label' htmlFor='inlineRadio3'>
            IT
          </label>
        </div>
        <div className='form-check form-check-inline mx-5'>
          <input
            className='form-check-input'
            type='radio'
            onClick={(e) => setRadio(e.target.value)}
            name='inlineRadioOptions'
            id='inlineRadio4'
            value='BCA'
          />
          <label className='form-check-label' htmlFor='inlineRadio4'>
            BCA
          </label>
        </div>
        <div className='form-check form-check-inline mx-5'>
          <input
            className='form-check-input'
            type='radio'
            onClick={(e) => setRadio(e.target.value)}
            name='inlineRadioOptions'
            id='inlineRadio5'
            value='GENERAL'
          />
          <label className='form-check-label' htmlFor='inlineRadio5'>
            GENERAL
          </label>
        </div>
      </div>
      <div className='container-fluid'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message children={error} />
        ) : (
          <div className='row'>
            {radio === 'ALL'
              ? books.map((e) => (
                  <div className='col' key={e._id}>
                    <BookCard data={e} />
                  </div>
                ))
              : books.map((e) =>
                  e.field === radio ? (
                    <div className='col' key={e._id}>
                      <BookCard data={e} />
                    </div>
                  ) : (
                    ''
                  )
                )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksScreen;
