import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color, flex }) => {
  return (
    <div className='rating my-2'>
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      {flex === 't' ? (
        <div>
          <span> {text ? text + ' Upvotes' : ''} </span>
        </div>
      ) : (
        <span> {text ? text + ' Upvotes' : ''} </span>
      )}
    </div>
  );
};

Rating.defaultProps = {
  // color: '#f8e825',
  color: 'red',
};

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.number,
  color: PropTypes.string,
};
export default Rating;
