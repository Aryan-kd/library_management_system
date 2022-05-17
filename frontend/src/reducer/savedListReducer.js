import {
  COMPLETE_LIST_ITEM,
  ISSUE_LIST_ADD_ITEM,
  SAVED_LIST_ADD_ITEM,
  SAVED_LIST_DELETE_ITEM,
} from '../constants/savedListConstant.js';

export const savedListReducer = (state = { savedBooks: [] }, action) => {
  switch (action.type) {
    case SAVED_LIST_ADD_ITEM:
      const item = action.payload;
      const existItem = state.savedBooks.find(
        (x) => x.product === item.product && x.uid === item.uid
      );
      if (existItem) {
        return {
          ...state,
          savedBooks: state.savedBooks.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          savedBooks: [...state.savedBooks, item],
        };
      }

    case SAVED_LIST_DELETE_ITEM:
      return {
        ...state,
        savedBooks: state.savedBooks.filter(
          (x) => x.product !== action.payload.id
        ),
      };

    default:
      return state;
  }
};

export const completedListReducer = (
  state = { completedBooks: [] },
  action
) => {
  switch (action.type) {
    case COMPLETE_LIST_ITEM:
      const completedItem = action.payload;
      const existCompletedItem = state.completedBooks.find(
        (x) => x.product === completedItem.product
      );
      if (existCompletedItem) {
        return {
          ...state,
          completedBooks: state.completedBooks.map((x) =>
            x.product === existCompletedItem.product ? completedItem : x
          ),
        };
      } else {
        return {
          ...state,
          completedBooks: [...state.completedBooks, completedItem],
        };
      }

    default:
      return state;
  }
};

export const issuedListReducer = (state = { issuedBooks: [] }, action) => {
  switch (action.type) {
    case ISSUE_LIST_ADD_ITEM:
      const issuedItem = action.payload;
      const existIssuedItem = state.issuedBooks.find(
        (x) => x.product === issuedItem.product
      );
      if (existIssuedItem) {
        return {
          ...state,
          issuedBooks: state.issuedBooks.map((x) =>
            x.product === existIssuedItem.product ? issuedItem : x
          ),
        };
      } else {
        return {
          ...state,
          issuedBooks: [...state.issuedBooks, issuedItem],
        };
      }

    default:
      return state;
  }
};
