import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  bookListReducer,
  bookDetailReducer,
  bookDeleteReducer,
  bookCreateReducer,
  bookUpdateReducer,
} from './reducer/bookListReducer.js';
import {
  savedListReducer,
  completedListReducer,
  issuedListReducer,
} from './reducer/savedListReducer.js';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsAReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducer/userReducer.js';

const reducer = combineReducers({
  bookList: bookListReducer,
  bookDetail: bookDetailReducer,
  bookDelete: bookDeleteReducer,
  bookCreate: bookCreateReducer,
  bookUpdate: bookUpdateReducer,
  savedList: savedListReducer,
  completedList: completedListReducer,
  issuedList: issuedListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsAReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

const savedBooksFromStorage = localStorage.getItem('savedBooks')
  ? JSON.parse(localStorage.getItem('savedBooks'))
  : [];

const completedBooksFromStorage = localStorage.getItem('completedBooks')
  ? JSON.parse(localStorage.getItem('completedBooks'))
  : [];

const issuedBooksFromStorage = localStorage.getItem('issuedBooks')
  ? JSON.parse(localStorage.getItem('issuedBooks'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  savedList: { savedBooks: savedBooksFromStorage },
  completedList: { completedBooks: completedBooksFromStorage },
  issuedList: { issuedBooks: issuedBooksFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
