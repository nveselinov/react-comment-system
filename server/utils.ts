export const getLastCommentId = (
  array: Array<{ commentId: number }>
): number => {
  if (array.length > 0) {
    return array[array.length - 1].commentId;
  }
  return 0;
};
