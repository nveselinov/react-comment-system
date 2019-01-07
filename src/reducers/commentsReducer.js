import {
    FETCH_COMMENTS,
    NEW_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT
  } from "../actions/actionTypes";
  
  const initialState = {
    comments: []
  };
  
  export default function commentsReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_COMMENTS:
        return {
          ...state,
          comments: action.comments.reverse()
        };
      case NEW_COMMENT:
        return {
          ...state
        };
      case EDIT_COMMENT:
        return {
          ...state
        };
      case DELETE_COMMENT:
        return {
          ...state,
          commentId: action.commentId
        };
      default:
        return state;
    }
  }
  