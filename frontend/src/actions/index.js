import { 
  fetchPosts,
  fetchCategories,
  deletePostAPI,
} from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_CATEGORIES = 'GET_CATEGORIES';

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

export const addCategory = (item) => (
  {
    type: GET_CATEGORIES,
    categories: {
      name: item.name,
      path: item.path
    }
  }
)

export const deletePost = (id) => (
  {
    type: DELETE_POST,
    post: {
      id,
      deleted: true
    }
  }
);