import { fetchPosts } from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';


export const retrievePosts = () => async (dispatch) => {
  console.log('Trying to retrieve the posts...');
  try {
    const posts = await fetchPosts();
    posts.map((item) => (
      dispatch(addPost(item))
    ));
  } catch(err) {
    console.error("Error retrieving posts...", err)
  }
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

export const deletePost = (id) => (
  {
    type: DELETE_POST,
    post: {
      id
    }
  }
);