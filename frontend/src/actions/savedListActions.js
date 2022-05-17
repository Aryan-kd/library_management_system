import axios from 'axios';
import {
  COMPLETE_LIST_ITEM,
  ISSUE_LIST_ADD_ITEM,
  SAVED_LIST_ADD_ITEM,
  SAVED_LIST_DELETE_ITEM,
} from '../constants/savedListConstant';

export const addBook = (id, uid) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/books/${id}`);
  dispatch({
    type: SAVED_LIST_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      publisher: data.publisher,
      rating: data.rating,
      upvotes: data.upvotes,
      uid: uid,
    },
  });
  localStorage.setItem(
    'savedBooks',
    JSON.stringify(getState().savedList.savedBooks)
  );
};

export const removeBook = (id, uid) => (dispatch, getState) => {
  dispatch({
    type: SAVED_LIST_DELETE_ITEM,
    payload: {
      id: id,
      uid: uid,
    },
  });
  localStorage.setItem(
    'savedBooks',
    JSON.stringify(getState().savedList.savedBooks)
  );
};

export const completeBook = (id, uid) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/books/${id}`);
  dispatch({
    type: COMPLETE_LIST_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      publisher: data.publisher,
      rating: data.rating,
      upvotes: data.upvotes,
      uid: uid,
    },
  });

  localStorage.setItem(
    'completedBooks',
    JSON.stringify(getState().completedList.completedBooks)
  );
};

export const issueBook = (id, uid) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/books/${id}`);
  dispatch({
    type: ISSUE_LIST_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      publisher: data.publisher,
      field: data.field,
      upvotes: data.upvotes,
      uid: uid,
      issued: false,
    },
  });

  localStorage.setItem(
    'issuedBooks',
    JSON.stringify(getState().issuedList.issuedBooks)
  );
};
