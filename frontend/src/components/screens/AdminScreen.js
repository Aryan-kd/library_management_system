import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const AdminScreen = ({ location, history }) => {
  //Login Info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo !== null) {
      if (userInfo.field !== 'ADMIN') {
        history.push('/');
      }
    } else {
      history.push('/');
    }
  }, [history, userInfo]);

  return (
    <div className='container-fluid'>
      <h1 className='text-center'>Admin Screen</h1>
      <div className='container text-center border'>
        <h1 className='text-center my-5'>Some Links</h1>
        <div className='d-flex justify-content-around align-item-center mb-4'>
          <div className='card bg-dark text-light rounded'>
            <div className='card-header'>Featured</div>
            <div className='card-body'>
              <h5 className='card-title'>Register New User</h5>
              <p className='card-text'>
                Create a new user wheather Student or Admin. Lorem ipsum dolor
                sit amet.
              </p>
              <Link to='/register' className='btn btn-primary'>
                Register User
              </Link>
            </div>
          </div>
          <div className='card bg-dark text-light rounded'>
            <div className='card-header'>Featured</div>
            <div className='card-body'>
              <h5 className='card-title'>List OF ALL Books</h5>
              <p className='card-text'>
                Checkout all books in the library, Edit the previous books or
                you can add new books in the library.
              </p>
              <Link to='/admin/booklist' className='btn btn-primary'>
                Book Lists
              </Link>
            </div>
          </div>
          <div className='card bg-dark text-light rounded'>
            <div className='card-header'>Featured</div>
            <div className='card-body'>
              <h5 className='card-title'>List OF All Users</h5>
              <p className='card-text'>
                Checkout all users who can access the library, edit their info
                or can give them access to be admin.
              </p>
              <Link to='/admin/userlist' className='btn btn-primary'>
                Users Lists
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
