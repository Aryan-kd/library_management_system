import React from 'react';

const Message = ({ children }) => {
  return (
    <div
      className='alert alert-warning alert-dismissible fade show'
      role='alert'
    >
      <strong>{children}</strong>
      <button
        type='button'
        className='btn-close'
        data-bs-dismiss='alert'
        aria-label='Close'
      ></button>
    </div>
  );
};

export default Message;
