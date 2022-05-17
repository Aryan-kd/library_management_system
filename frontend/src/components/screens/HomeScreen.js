import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HomeScreen = ({ history }) => {
  //Login Info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className='bg-library m-0 p-0'>
      <div className='coverbg2'>
        <p>h</p>
        <h1 className='text-center container my-4 p-4 rounded bg-danger w-50'>
          Welcome ABC University Online Library
        </h1>
        <div className='conatiner-fluid card-box p-5'>
          {userInfo ? (
            <h1 className='text-white my-5 text-underline-w'>
              {userInfo.name}
            </h1>
          ) : (
            <div className='card rounded mb-3'>
              <img
                src='/images/background/student-icon.jpg'
                className='card-img-top'
                alt='student'
              />
              <div className='card-body'>
                <h3 className='card-title'>Student/Admin Login</h3>
                <Link to='/login' className='btn btn-primary text-underline'>
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
