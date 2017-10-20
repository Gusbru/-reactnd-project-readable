export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const addPost = ({ id, timestamp, title, body, author, category, voteScore, deleted }) => (
  {
    type: ADD_POST,
    post: {
      id,
      timestamp, 
      title,
      body,
      author,
      category,
      voteScore,
      deleted
    }
  }
);

export const deletePost = (id) => (
  {
    type: DELETE_POST,
    post: {
      id
    }
  }
);