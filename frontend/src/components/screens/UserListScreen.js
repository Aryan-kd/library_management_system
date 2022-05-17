import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../Message';
import Loader from '../Loader';
import { listUsers, deleteUser } from '../../actions/userAction';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.field === 'ADMIN') {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, userInfo, history, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure, you want to delete it.')) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <div className='container-fluid'>
      <Link to='/admin' className='btn btn-secondary my-3'>
        Go Back
      </Link>
      <h1 className='my-3 text-center'>Users List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <table className='table table-dark table-hover'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Name</th>
              <th scope='col'>EMAIL</th>
              <th scope='col'>UID</th>
              <th scope='col'>FIELD</th>
              <th scope='col'>ADMIN</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.uid}</td>
                <td>{user.field}</td>
                <td>
                  {user.field === 'ADMIN' ? (
                    <i className='fas fa-check text-success'></i>
                  ) : (
                    <i className='fas fa-times text-danger'></i>
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <button className='btn btn-secondary btn-sm'>
                      <i className='fas fa-edit'></i>
                    </button>
                  </Link>
                  {user.field === 'ADMIN' ? (
                    ''
                  ) : (
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListScreen;
