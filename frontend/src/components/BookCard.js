import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const BookCard = ({ data }) => {
  return (
    <div
      className='card card1 mx-auto text-center text-black text-decoration-none mb-3'
      data-bs-toggle='tooltip'
      data-bs-placement='bottom'
      title={data.description}
    >
      <Link to={`/book/${data._id}`}>
        <img src={data.image} className='card-img-top' alt={data.name} />
      </Link>
      <div className='card-body'>
        <h5 className='card-title'>{data.name}</h5>
        {/* <p className='card-text'>{data.description}</p> */}

        <Rating value={data.rating} text={data.upvotes} />
        <div className='d-flex justify-content-around align-items-center'>
          <Link to={`/book/${data._id}`} className='btn btn-outline-primary'>
            Read
          </Link>
          <Link to={`/saved/${data._id}`} className='btn btn-outline-warning'>
            ADD
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
