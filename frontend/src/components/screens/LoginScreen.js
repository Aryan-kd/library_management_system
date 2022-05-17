import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { login } from '../../actions/userAction';

const LoginScreen = ({ location, history }) => {
  const [uid, setUid] = useState('');

  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(uid, password));
  };
  return (
    <div className='bg-loginpage'>
      <div className='coverbg'>
        <div className=' bg-white rounded p-4'>
          <h1 className='text-center text-underline'>
            Library Management System
          </h1>
          <h4 className='text-center'>Log In</h4>
          <p className='text-center'>Welcome to ABC University Library</p>
        </div>
        {error && <Message className='bg-danger'>{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler} className='form-login'>
          <div className='mb-3'>
            <label htmlFor='UID' className='form-label'>
              <h4 className='text-white'>ID</h4>
            </label>
            <input
              type='text'
              className='form-control'
              id='UID'
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              placeholder='Email ID/UID'
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='Passwordlogin' className='form-label'>
              <h4 className='text-white'>Password</h4>
            </label>
            <input
              type='password'
              className='form-control'
              id='Passwordlogin'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
          </div>
          <input
            type='submit'
            className='btn btn-danger w-100'
            value='Login In'
          />
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
