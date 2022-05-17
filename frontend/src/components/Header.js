import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark text-light'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          Library
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/books'>
                <i className='fa-solid fa-book'></i> Books
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/saved'>
                <i className='fa-solid fa-book-open'></i> Saved Books
              </Link>
            </li>
          </ul>
          <ul className='navbar-nav ml-auto mb-2 mb-lg-0'>
            {userInfo && userInfo.field === 'ADMIN' ? (
              <li className='nav-item dropdown'>
                <Link
                  className='nav-link dropdown-toggle'
                  id='navbarDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                  to={''}
                >
                  <i className='fa-solid fa-user-gear'></i> Admin
                </Link>
                <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                  <li>
                    <Link to='/admin' className='dropdown-item'>
                      Admin
                    </Link>
                  </li>
                  <li>
                    <Link to='/register' className='dropdown-item'>
                      Register User
                    </Link>
                  </li>
                  <li>
                    <Link to='/admin/booklist' className='dropdown-item'>
                      Book Lists
                    </Link>
                  </li>
                  <li>
                    <Link to='/admin/userlist' className='dropdown-item'>
                      Users Lists
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              ''
            )}
            <div className='nav-item'>
              {userInfo ? (
                <li className='nav-item dropdown'>
                  <Link
                    className='nav-link dropdown-toggle'
                    id='navbarDropdown'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                    to={''}
                  >
                    <i className='fa-solid fa-user'></i>{' '}
                    {userInfo.name.split(' ')[0]}
                  </Link>
                  <ul
                    className='dropdown-menu'
                    aria-labelledby='navbarDropdown'
                  >
                    <li>
                      <Link className='dropdown-item' to='/profile'>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button className='dropdown-item' onClick={logoutHandler}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <Link className='nav-link' to='/profile'>
                  <i className='fa-solid fa-user'></i> Profile
                </Link>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
