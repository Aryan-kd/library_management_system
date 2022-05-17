import {
  BOOK_LIST_SUCCESS,
  BOOK_LIST_REQUEST,
  BOOK_LIST_FAIL,
  BOOK_DETAIL_REQUEST,
  BOOK_DETAIL_SUCCESS,
  BOOK_DETAIL_FAIL,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
} from '../constants/bookConstant.js';
import axios from 'axios';

export const listBooks = () => async (dispatch) => {
  try {
    dispatch({ type: BOOK_LIST_REQUEST });

    const { data } = await axios.get(`/api/books`);
    dispatch({
      type: BOOK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listBookDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_DETAIL_REQUEST });

    const { data } = await axios.get(`/api/books/${id}`);
    dispatch({
      type: BOOK_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBook = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `${userInfo.uid}`,
      },
    };

    await axios.delete(`/api/books/${id}`, config);

    dispatch({
      type: BOOK_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: BOOK_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBook = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `${userInfo.uid}`,
      },
    };

    const { data } = await axios.post(`/api/books`, {}, config);

    dispatch({
      type: BOOK_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateBook = (book) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOK_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `${userInfo.uid}`,
      },
    };

    const { data } = await axios.put(`/api/books/${book._id}`, book, config);

    dispatch({
      type: BOOK_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
