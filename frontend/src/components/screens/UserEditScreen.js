import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { getUserDetails, updateUser } from '../../actions/userAction';
import { USER_EDIT_RESET } from '../../constants/userConstants';
import { Link } from 'react-router-dom';

const UserEditScreen = ({ match, location, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const [field, setField] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: sucessUpdate,
  } = userUpdate;

  useEffect(() => {
    if (sucessUpdate) {
      dispatch({ type: USER_EDIT_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setField(user.field);
        setUid(user.uid);
      }
    }
  }, [dispatch, user, userId, sucessUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUser({ _id: userId, name, email, uid, field }));
  };
  return (
    <div className='container-fluid'>
      <Link to='/admin/userlist' className='btn btn-secondary my-3'>
        Go Back
      </Link>
      <div className=' bg-white rounded p-4'>
        <h1 className='text-center text-underline'>
          Library Management System
        </h1>
        <h4 className='text-center'>Edit User</h4>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message>{errorUpdate}</Message>}
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message className='bg-danger'>{error}</Message>
      ) : (
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

          <input
            type='submit'
            className='btn btn-warning w-100'
            value='Update'
          />
        </form>
      )}
    </div>
  );
};

export default UserEditScreen;
