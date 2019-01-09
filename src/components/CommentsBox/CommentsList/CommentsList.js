import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { fetchComments, editComment, deleteComment } from "../../../actions";
import "./CommentsList.css";

class CommentList extends PureComponent {
  render() {
    return this.props.comments.comments.map(comment => {
      return (
        <div key={comment.commentId} className="comments">
          <div className="comment-item">
            <b>Comment</b>: {comment.comment}
            <button onClick={() => this.onEditComment(comment.commentId)}>
              [Edit]
            </button>
            <button onClick={() => this.onDeleteComment(comment.commentId)}>
              [Delete]
            </button>
          </div>
        </div>
      );
    });
  }

  onEditComment = commentId => {
    const updatedComment = window.prompt("Edit comment", commentId);

    if (updatedComment) {
      this.props
        .editComment(commentId, updatedComment)
        .then(this.props.fetchComments);
    }
  };

  onDeleteComment = commentId => {
    if (window.confirm("Are you sure?")) {
      this.props.deleteComment(commentId).then(this.props.fetchComments);
    }
  };
}

const mapStateToProps = state => ({
  comments: state.comments
});

const mapDispatchToProps = dispatch => ({
  fetchComments: () => dispatch(fetchComments()),
  editComment: (commentId, newComment) =>
    dispatch(editComment(commentId, newComment)),
  deleteComment: commentId => dispatch(deleteComment(commentId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList);
