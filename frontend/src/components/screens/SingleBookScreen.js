import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import Rating from '../Rating';
import Loader from '../Loader';
import Message from '../Message';
import { listBookDetail } from '../../actions/bookActions';

const SingleBookScreen = ({ match, history, location }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const bookDetail = useSelector((state) => state.bookDetail);
  const { loading, error, book } = bookDetail;
  useEffect(() => {
    if (!userInfo) {
      history.push(redirect);
    }

    dispatch(listBookDetail(match.params.id));
  }, [dispatch, match.params.id, history, userInfo, redirect]);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const dated = String(book.date);
  const date = dated.split('T')[0];
  return (
    <div className='container-fluid'>
      <Link className='btn btn-light my-3 p-3' to='/books'>
        <i className='fa-solid fa-arrow-left'></i> Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message children={error} />
      ) : (
        <div className='container-fluid'>
          <div className='row'>
            <div className='mb-3 mx-auto col-xl-3 col-lg-5 col-md-6'>
              <img
                src={book.image}
                className='card-img-top h-auto w-100'
                alt={book.name}
              />
            </div>
            <div className='mb-3 mx-auto col-xl-3 col-lg-5 col-md-6'>
              <div className='list-group text-center'>
                <div className='list-group-item list-group-item-action'>
                  <h2>{book.name}</h2>
                </div>
                <div className='list-group-item list-group-item-action'>
                  <h5>Description: {book.description}</h5>
                </div>
                <div className='list-group-item list-group-item-action'>
                  <Rating value={book.rating} text={book.upvotes} />
                </div>
                <div className='list-group-item list-group-item-action'>
                  <p>Field: {book.field}</p>
                </div>
                <div className='list-group-item list-group-item-action'>
                  <p>Production House: {book.publisher}</p>
                </div>
                <div className='list-group-item list-group-item-action'>
                  <p>Date: {date}</p>
                </div>
                <div className='list-group-item list-group-item-action'>
                  <Link
                    className='btn btn-outline-success'
                    to={`/saved/${book._id}`}
                  >
                    Add to List
                  </Link>
                </div>
              </div>
            </div>
            <div className='mb-3 mx-auto col-xl-6 col-lg-8 col-md-12'>
              {book.pdf && (
                <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js'>
                  <Viewer
                    fileUrl={book.pdf}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBookScreen;
