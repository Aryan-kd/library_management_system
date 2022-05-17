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
      <h1 className='text-center'>AdminScreen</h1>{' '}
      <div className='container text-center border'>
        <h1 className=''>Not Signed In</h1>
        <div className='d-flex justify-content-around align-item-center'>
          <Link to='/register' className='btn btn-primary'>
            Register User
          </Link>
          <Link to='/admin/booklist' className='btn btn-primary'>
            Book Lists
          </Link>
          <Link to='/admin/userlist' className='btn btn-primary'>
            Users Lists
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
