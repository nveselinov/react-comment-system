import React, { PureComponent } from "react";

import "./CommentsBox.css";
import CommentForm from "./CommentForm/CommentForm";
import CommentList from "./CommentsList/CommentsList";

class CommentsBox extends PureComponent {
  render() {
    return (
      <div>
        <CommentForm />
        <CommentList />
      </div>
    );
  }
}

export default CommentsBox;
