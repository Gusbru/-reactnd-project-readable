import { 
  fetchPosts,
  fetchCategories,
  writePostAPI,
  deletePostAPI,
  postUpVoteAPI,
  postDownVoteAPI,
  editPostAPI,
  fetchPostCommentAPI,
  addPostCommentAPI,
  commentVoteAPI,
  rmCommentAPI,
  editCommentAPI,
} from '../utils/api';

export const ADD_POST           = 'ADD_POST';
export const DELETE_POST        = 'DELETE_POST';
export const GET_CATEGORIES     = 'GET_CATEGORIES';
export const POST_VOTE_UP       = 'POST_VOTE_UP';
export const POST_VOTE_DOWN     = 'POST_VOTE_DOWN';
export const EDIT_POST          = 'EDIT_POST';
export const GET_COMMENTS       = 'GET_COMMENTS';
export const NUMBER_OF_COMMENTS = 'NUMBER_OF_COMMENTS';
export const NEW_COMMENT        = 'NEW_COMMENT';
export const COMMENT_VOTE_UP    = 'COMMENT_VOTE_UP';
export const COMMENT_VOTE_DOWN  = 'COMMENT_VOTE_DOWN';
export const DELETE_COMMENT     = 'DELETE_COMMENT';
export const EDIT_COMMENT       = 'EDIT_COMMENT';

// Get all posts from the server
export const retrievePosts = () => async (dispatch) => {
  try {
    const posts = await fetchPosts();
    posts.map((item) => (
      dispatch(addPost(item))
    ));

    //get the comments for each post
    posts.map((item) => (
      dispatch(fetchCommentForPost(item.id))
    ));
  } catch(err) {
    console.error("Error retrieving posts...", err);
  };
};

// Write post to server
export const writePost = (data) => async(dispatch) => {
  try {
    await writePostAPI(data);
    dispatch(addPost(data));
  } catch(err) {
    console.log("Error writing post to server...", err);
  };
};

//Removing post from the server
export const rmPost = (id) => async(dispatch) => {
  try {
    const postRemoved = await deletePostAPI(id);
    dispatch(deletePost(postRemoved.id));
  } catch(err) {
    console.error('Error removing post...', err);
  };
};

//Vote up to a post
export const upPost = (id) => async(dispatch) => {
  try {
    await postUpVoteAPI(id);
    dispatch(postVoteUp(id));
  } catch(err) {
    console.log('Error voting up to a post...', err);
  };
};

// Vote down to a post
export const downPost = (id) => async(dispatch) => {
  try {
    await postDownVoteAPI(id);
    dispatch(postVoteDown(id));
  } catch(err) {
    console.log('Error voting down to a post...', err);
  };
};

// update an existing post in the server
export const updatePost = (data) => async(dispatch) => {
  try {
    await editPostAPI(data);
    dispatch(editPost(data));
  } catch(err) {
    console.log('Error updating post...', err);
  };
};

// Get all categories from the server
export const retrieveCategories = () => async (dispatch) => {
  try {
    const {categories} = await fetchCategories();
    categories.map((item) => (
      dispatch(addCategory(item))
    ));
  } catch(err) {
    console.error("Error retrieving categories...", err);
  };
};

// get the comments for a single post
export const fetchCommentForPost = (id) => async(dispatch) => {
  try {
    const comments = await fetchPostCommentAPI(id);
    comments.map(item => (
      dispatch(getComment(item))
    ));

    comments.map(item => (
      dispatch(numberOfComments(item.parentId))
    ));
  } catch(err) {
    console.error('Error retrieving post comment...', err);
  };
};

// Create a new comment
export const createNewComment = (data, postId) => async(dispatch) => {
  try {
    await addPostCommentAPI(data, postId);
    dispatch(newComment(data, postId));
    dispatch(numberOfComments(postId));
  } catch(err) {
    console.error('Error writting post comment...', err);
  };
};

//Vote to a comment
export const commentVote = (id, voteType) => async(dispatch) => {
  try {
    await commentVoteAPI(id, voteType);
    dispatch(voteComment(id, voteType));
  } catch(err) {
    console.log('Error voting up to a comment...', err);
  };
};

//Delete a comment
export const removeComment = (id) => async(dispatch) => {
  try {
    await rmCommentAPI(id);
    dispatch(deleteComment(id));
  } catch(err) {
    console.log('Error deleting a comment...', err);
  }
}

// update an existing comment
export const updateComment = (data) => async(dispatch) => {
  try {
    await editCommentAPI(data);
    dispatch(editComment(data));
  } catch(err) {
    console.log('Error updating comment...', err);
  };
};


const addPost = ({ id, timestamp, title, body, author, category, voteScore, deleted }) => (
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
      deleted,
      numberComments: 0
    }
  }
);


const deletePost = (id) => (
  {
    type: DELETE_POST,
    post: {
      id,
      deleted: true
    }
  }
);

const postVoteUp = (id) => (
  {
    type: POST_VOTE_UP,
    post: {
      id
    }
  }
);

const postVoteDown = (id) => (
  {
    type: POST_VOTE_DOWN,
    post: {
      id
    }
  }
);

const editPost = (data) => (
  {
    type: EDIT_POST,
    post: {
      id   : data.id,
      title: data.title,
      body : data.body,
    }
  }
);

const addCategory = (data) => (
  {
    type: GET_CATEGORIES,
    categories: {
      name: data.name,
      path: data.path
    }
  }
);

const getComment = (data) => (
  {
    type: GET_COMMENTS,
    comment: {
      id           : data.id,
      parentId     : data.parentId,
      timestamp    : data.timestamp,
      body         : data.body,
      author       : data.author,
      voteScore    : data.voteScore,
      deleted      : data.deleted,
      parentDeleted: data.parentDeleted,
    }
  }
);

const numberOfComments = (postId) => (
  {
    type: NUMBER_OF_COMMENTS,
    post: {
      id: postId,
    }
  }
);

const newComment = (data, postId) => (
  {
    type: NEW_COMMENT,
    comment: {
      id           : data.id,
      parentId     : postId,
      timestamp    : data.timestamp,
      body         : data.body,
      author       : data.author,
      voteScore    : data.voteScore,
      deleted      : false,
      parentDeleted: false,
    }
  }
);

const voteComment = (id, voteType) => {
  switch(voteType){
    case 'upVote':
      return(
        {
          type: COMMENT_VOTE_UP,
          comment: {
            id,
          }
        }
      );
    case 'downVote':
      return(
        {
          type: COMMENT_VOTE_DOWN,
          comment: {
            id,
          }
        }
      );
    default:
      console.error('Error voting comment');
  };
};

const deleteComment = (id) => (
  {
    type: DELETE_COMMENT,
    comment: {
      id,
      deleted: true
    }
  }
);

const editComment = (data) => (
  {
    type: EDIT_COMMENT,
    comment: {
      id   : data.id,
      body : data.body,
    }
  }
);