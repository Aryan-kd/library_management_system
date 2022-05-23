import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { getUserDetails, updateUserProfile } from '../../actions/userAction';

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const [field, setField] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  //Login Info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const issuedList = useSelector((state) => state.issuedList);
  const { issuedBooks } = issuedList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
        setUid(user.uid);
        setField(user.field);
      }
    }
  }, [dispatch, history, user, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords Do Not Match');
    } else {
      if (field === 'ADMIN') {
        if (userInfo.field === 'ADMIN') {
          dispatch(
            updateUserProfile({
              id: user._id,
              name,
              email,
              uid,
              field,
              password,
            })
          );
        } else {
          window.alert('Your Not Admin');
        }
      } else {
        dispatch(
          updateUserProfile({ id: user._id, name, email, uid, field, password })
        );
      }
    }
  };
  return (
    <div className='container-fluid'>
      <h1 className='container w-50 text-center my-1 p-5'>Your Profile</h1>
      {message && <Message className='bg-danger'>{message}</Message>}
      {error && <Message className='bg-danger'>{error}</Message>}
      {success && (
        <Message className='bg-success'>Successfully Updated</Message>
      )}
      {loading && <Loader />}
      {userInfo ? (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-6 col-sm-6 col-md-6'>
              <h1 className='text-center'>Update Details</h1>
              <form
                onSubmit={submitHandler}
                className='form-login my-3 w-100 mx-auto'
              >
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
                    className='form-control text-uppercase'
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
                  className='btn btn-warning w-100'
                  value='Update'
                />
              </form>
            </div>
            <div className='col-lg-6 col-sm-6 col-md-5'>
              <div className='d-flex justify-content-center align-items-center'>
                <img
                  src={userInfo.image}
                  className='profile-image'
                  alt='student'
                />
              </div>
              <h2 className='text-center my-3'>Profile Image</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className='container text-center border'>
          <h1 className=''>Not Signed In</h1>
          <Link to='/login' className='btn btn-primary text-underline'>
            Login
          </Link>
        </div>
      )}
      <div className='contaienr-fluid my-3'>
        <h1 className='text-center'>ISSUED Books</h1>
        {userInfo ? (
          userInfo.field === 'ADMIN' ? (
            <div className='container-fluid'>
              <table className='table table-dark table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>UID</th>
                    <th scope='col'>PUBLISHER</th>
                    <th scope='col'>FIELD</th>
                    <th scope='col'>ISSUED</th>
                  </tr>
                </thead>
                <tbody>
                  {issuedBooks.map((iBook) => (
                    <tr key={iBook.product}>
                      <td>{iBook.product}</td>
                      <td>{iBook.name}</td>
                      <td>{iBook.uid}</td>
                      <td>{iBook.publisher}</td>
                      <td>{iBook.field}</td>
                      <td>
                        {iBook.issued ? (
                          <i className='fas fa-check text-success'></i>
                        ) : (
                          <i className='fas fa-times text-danger'></i>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='container-fluid'>
              <table className='table table-dark table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>UID</th>
                    <th scope='col'>PUBLISHER</th>
                    <th scope='col'>FIELD</th>
                    <th scope='col'>ISSUED</th>
                  </tr>
                </thead>
                <tbody>
                  {issuedBooks.map((iBook) =>
                    iBook.uid === userInfo.uid ? (
                      <tr key={iBook.product}>
                        <td>{iBook.product}</td>
                        <td>{iBook.name}</td>
                        <td>{iBook.uid}</td>
                        <td>{iBook.publisher}</td>
                        <td>{iBook.field}</td>
                        <td>
                          {iBook.issued ? (
                            <i className='fas fa-check text-success'></i>
                          ) : (
                            <i className='fas fa-times text-danger'></i>
                          )}
                        </td>
                      </tr>
                    ) : (
                      ''
                    )
                  )}
                </tbody>
              </table>
            </div>
          )
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
