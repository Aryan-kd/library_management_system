import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { register } from '../../actions/userAction';
import { Link } from 'react-router-dom';

const RegisterUserScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const [field, setField] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo.field !== 'ADMIN') {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords Do Not Match');
    } else {
      dispatch(register(name, email, uid, password, field));
    }
  };
  return (
    <div className='container-fluid'>
      <Link to='/admin' className='btn btn-secondary my-3'>
        Go Back
      </Link>
      <div className=' bg-white rounded p-4'>
        <h1 className='text-center text-underline'>
          Library Management System
        </h1>
        <h4 className='text-center'>Register User</h4>
      </div>
      {message && <Message className='bg-danger'>{message}</Message>}
      {error && <Message className='bg-danger'>{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler} className='form-login my-3 w-50 mx-auto'>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            <h4 className='text-white'>Name</h4>
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='UID' className='form-label'>
            <h4 className='text-white'>UID</h4>
          </label>
          <input
            type='text'
            className='form-control'
            id='UID'
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder='UID'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            <h4 className='text-white'>Email ID</h4>
          </label>
          <input
            type='text'
            className='form-control'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='abc@example.com'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='field' className='form-label'>
            <h4 className='text-white'>Field</h4>
          </label>
          <input
            type='text'
            className='form-control'
            id='field'
            value={field}
            onChange={(e) => setField(e.target.value)}
            placeholder='CSE/IT/BCA'
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

        <div className='mb-3'>
          <label htmlFor='ConfirmPasswordlogin' className='form-label'>
            <h4 className='text-white'>Confirm Password</h4>
          </label>
          <input
            type='password'
            className='form-control'
            id='ConfirmPasswordlogin'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            required
          />
        </div>

        <input
          type='submit'
          className='btn btn-danger w-100'
          value='Register'
        />
      </form>
    </div>
  );
};

export default RegisterUserScreen;
