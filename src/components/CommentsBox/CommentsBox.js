import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { fetchComments, newComment } from "../../actions/";
import "./CommentsBox.css";
import CommentsList from "./CommentsList/CommentsList";

class CommentsBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      btnDisabled: false
    };
  }

  render() {
    return (
      <div>
        {this.renderCommentForm()}
        <CommentsList />
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchComments();
  }

  handleCommentChange = event => {
    // @TODO: Refactor the validation. Take the logic in dedicaded method with switch statement.
    this.setState({ [event.target.name]: event.target.value.trim() });
    if (event.target.value.length === 100 || event.target.value === "") {
      this.setState({ btnDisabled: true });
    } else {
      this.setState({ btnDisabled: false });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.comment === "") {
      return;
    }
    this.props.newComment(this.state.comment).then(this.props.fetchComments);
    this.setState({ comment: "" });
  };

  renderCommentForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <b>Comment:</b>
          <input
            type="text"
            value={this.state.comment}
            maxLength="100"
            name="comment"
            onChange={this.handleCommentChange}
            autoFocus
            className="comment-input"
          />
        </label>
        <button type="submit" disabled={this.state.btnDisabled}>
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments
});

const mapDispatchToProps = dispatch => ({
  fetchComments: () => dispatch(fetchComments()),
  newComment: comment => dispatch(newComment(comment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsBox);
