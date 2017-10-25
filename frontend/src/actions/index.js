import { 
  fetchPosts,
  fetchCategories,
  writePostAPI,
  deletePostAPI,
  postUpVoteAPI,
  postDownVoteAPI,
} from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const POST_VOTE_UP = 'POST_VOTE_UP';
export const POST_VOTE_DOWN = 'POST_VOTE_DOWN';

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
    dispatch(postVodeDown(id));
  } catch(err) {
    console.log('Error voting down to a post...', err);
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

const addCategory = (item) => (
  {
    type: GET_CATEGORIES,
    categories: {
      name: item.name,
      path: item.path
    }
  }
)

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

const postVodeDown = (id) => (
  {
    type: POST_VOTE_DOWN,
    post: {
      id
    }
  }
)