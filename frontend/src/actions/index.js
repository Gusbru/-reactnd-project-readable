import { 
  fetchPosts,
  fetchCategories,
  writePostAPI,
  deletePostAPI,
  postUpVoteAPI,
  postDownVoteAPI,
  editPostAPI,
  fetchPostCommentAPI,
} from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const POST_VOTE_UP = 'POST_VOTE_UP';
export const POST_VOTE_DOWN = 'POST_VOTE_DOWN';
export const EDIT_POST = 'EDIT_POST';
export const GET_COMMENT = 'GET_COMMENT';

// Get all posts from the server
export const retrievePosts = () => async (dispatch) => {
  console.log('[actions]Trying to retrieve the posts...');
  try {
    const posts = await fetchPosts();
    posts.map((item) => (
      dispatch(addPost(item))
    ));
  } catch(err) {
    console.error("Error retrieving posts...", err);
  }
}

// Write post to server
export const writePost = (data) => async(dispatch) => {
  console.log('[action]Adding a post...');
  try{
    await writePostAPI(data);
    dispatch(addPost(data));
  } catch(err){
    console.log("Error writing post to server...", err);
  }
}

//Removing post from the server
export const rmPost = (id) => async(dispatch) => {
  console.log('[action]Removing a post...');
  try{
    const postRemoved = await deletePostAPI(id);
    dispatch(deletePost(postRemoved.id));
  }catch(err){
    console.error('Error removing post...', err);
  };
}

//Vote up to a post
export const upPost = (id) => async(dispatch) => {
  try{
    await postUpVoteAPI(id);
    dispatch(postVoteUp(id));
  } catch(err) {
    console.log('Error voting up to a post...', err);
  }
}

// Vote down to a post
export const downPost = (id) => async(dispatch) => {
  try {
    await postDownVoteAPI(id);
    dispatch(postVoteDown(id));
  } catch(err) {
    console.log('Error voting down to a post...', err);
  }
}

// update an existing post in the server
export const updatePost = (data) => async(dispatch) => {
  try{
    await editPostAPI(data);
    dispatch(editPost(data));
  } catch(err){
    console.log('Error updating post...', err);
  }
}

// Get all categories from the server
export const retrieveCategories = () => async (dispatch) => {
  console.log('[actions]Trying to retrieve the categories...');
  try{
    const {categories} = await fetchCategories();
    categories.map((item) => (
      dispatch(addCategory(item))
    ));
  } catch(err) {
    console.error("Error retrieving categories...", err);
  }
}

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
      deleted
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
)

const postVoteDown = (id) => (
  {
    type: POST_VOTE_DOWN,
    post: {
      id
    }
  }
)

const editPost = (data) => (
  {
    type: EDIT_POST,
    post: {
      id: data.id,
      title: data.title,
      body: data.body,
    }
  }
)

const addCategory = (data) => (
  {
    type: GET_CATEGORIES,
    categories: {
      name: data.name,
      path: data.path
    }
  }
)

const getComment = (data) => (
  {
    type: GET_COMMENT,
    
  }
)