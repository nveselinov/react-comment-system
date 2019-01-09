import {
  FETCH_COMMENTS,
  NEW_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from "./actionTypes";
import { serverEndpoint, serverPort } from "../config";

const apiUrl = `${serverEndpoint}:${serverPort}`;

export const fetchComments = () => dispatch => {
  // @TODO: dispatch action on error and handle on UI
  fetch(`${apiUrl}/api/getComments`)
    .then(response => response.json())
    .then(comments => {
      dispatch({
        type: FETCH_COMMENTS,
        comments
      });
    })
    .catch(console.log);
};

export const newComment = comment => dispatch => {
  // @TODO: dispatch action on error and handle on UI
  return fetch(`${apiUrl}/api`, {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ comment: comment }),
    json: true
  })
    .then(comment => {
      dispatch({
        type: NEW_COMMENT,
        comment
      });
    })
    .catch(console.log);
};

export const editComment = (commentId, newComment) => dispatch => {
  return fetch(`${apiUrl}/api/editComment`, {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ commentId: commentId, newComment: newComment }),
    json: true
  }).then(() => {
    dispatch({
      type: EDIT_COMMENT
    });
  });
  // @TODO: dispatch action on error and handle on UI
};

export const deleteComment = commentId => dispatch => {
  // @TODO: dispatch action on error and handle on UI
  return fetch(`${apiUrl}/api/deleteComment`, {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ commentId: commentId }),
    json: true
  })
    .then(commentId => {
      dispatch({
        type: DELETE_COMMENT,
        commentId: commentId
      });
    })
    .catch(console.log);
};
