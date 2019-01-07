import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { fetchComments, editComment, deleteComment } from "../../../actions/";
import "./CommentsList.css";

class CommentList extends PureComponent {
  render() {
    return (
      <div className="comment-item">
        <b>Comment</b>: {this.props.comment}
        <button onClick={() => this.onEditComment(this.props.commentId)}>
          [Edit]
        </button>
        <button onClick={() => this.onDeleteComment(this.props.commentId)}>
          [Delete]
        </button>
      </div>
    );
  }

  onEditComment = commentId => {
    let updatedComment = window.prompt("Edit comment", this.props.comment);
    this.props
      .editComment(commentId, updatedComment)
      .then(this.props.fetchComments);
  };

  onDeleteComment = commentId => {
    if (window.confirm("Are you sure?")) {
      this.props.deleteComment(commentId).then(this.props.fetchComments);
    }
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchComments: () => dispatch(fetchComments()),
    editComment: (commentId, newComment) =>
      dispatch(editComment(commentId, newComment)),
    deleteComment: commentId => dispatch(deleteComment(commentId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CommentList);
