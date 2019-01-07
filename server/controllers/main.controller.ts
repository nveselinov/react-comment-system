import { Router, Request, Response } from "express";

import { getLastCommentId } from "../utils";
import { IComments } from "./interfaces";

const router: Router = Router();

let comments: IComments[] = [];

// @TODO: Implement validations

router.post("/", (request: Request, response: Response) => {
  if (!request.body.comment) {
    response.end();
  }

  const lastCommentId = getLastCommentId(comments);
  comments.push({
    commentId: lastCommentId + 1,
    comment: request.body.comment
  });

  //@TODO: response.send({success: true/false});
  // and handle on frontend accordingly
  response.end();
});

router.get("/getComments", (request: Request, response: Response) => {
  response.send(comments);
});

router.post("/editComment", (request: Request, response: Response) => {
  if (!request.body.commentId && !request.body.newComment) {
    response.end();
  }

  comments.forEach(comment => {
    if (comment.commentId === request.body.commentId) {
      comment.comment = request.body.newComment;
      //@TODO: response.send({success: true/false});
      // and handle on frontend accordingly
    }
    response.end();
  });
});

router.post("/deleteComment", (request: Request, response: Response) => {
  if (!request.body.commentId) {
    response.end();
  }

  comments.forEach((comment, index) => {
    if (comment.commentId === request.body.commentId) {
      comments.splice(index, 1);
      response.end();
    }
  });
});

export const MainController: Router = router;
