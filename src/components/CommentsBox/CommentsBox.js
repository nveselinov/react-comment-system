import React from "react";

import "./CommentsBox.css";
import CommentForm from "./CommentForm/CommentForm";
import CommentList from "./CommentsList/CommentsList";

const CommentsBox = () => {
  return (
    <div>
      <CommentForm />
      <CommentList />
    </div>
  );
};

export default CommentsBox;
