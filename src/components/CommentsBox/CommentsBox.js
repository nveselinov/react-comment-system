import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchComments, newComment } from "../../actions/";
import "./CommentsBox.css";
import CommentsList from "./CommentsList/CommentsList";

class CommentsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.renderCommentForm()}
        <div className="comments">{this.renderComments()}</div>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchComments();
  }

  handleCommentChange = event => {
    // @TODO: Refactor the validation. Take the logic in dedicaded method with switch statement.
    event.persist();
    this.setState({ [event.target.name]: event.target.value.trim() });
    if (event.target.value.length === 100 || event.target.value === "") {
      event.target.form[1].disabled = true;
    } else {
      event.target.form[1].disabled = false;
    }
  };

  handleSubmit = event => {
    event.persist();
    event.preventDefault();
    this.props.newComment(event.target[0].value).then(this.props.fetchComments);
    event.target[0].value = "";
  };

  renderCommentForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <b>Comment:</b>
          <input
            type="text"
            name="comment"
            maxLength="100"
            onChange={this.handleCommentChange}
            autoFocus
            className="comment-input"
          />
        </label>
        <button type="submit" disabled={true}>
          Submit
        </button>
      </form>
    );
  }

  renderComments() {
    return this.props.comments.comments.map(comment => {
      return (
        <CommentsList
          key={comment.commentId}
          commentId={comment.commentId}
          comment={comment.comment}
        />
      );
    });
  }
}

CommentsBox.propTypes = {
  fetchComments: PropTypes.func.isRequired,
  newComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  comments: state.comments
});

const mapDispatchToProps = dispatch => {
  return {
    fetchComments: () => dispatch(fetchComments()),
    newComment: comment => dispatch(newComment(comment))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsBox);
