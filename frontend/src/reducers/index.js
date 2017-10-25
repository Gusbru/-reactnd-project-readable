import { combineReducers } from 'redux';

import {
  ADD_POST,
  DELETE_POST,
  GET_CATEGORIES,
  POST_VOTE_UP,
  POST_VOTE_DOWN
} from '../actions';

const initialStatePosts = {
  users: {},
  posts: [],
  replies: [],
}

const initialStateCategories = {
  categories: []
}


const postActions = (state = initialStatePosts, action) => {
  const currentPost = action.post;
  // let posts = [];
    
  switch(action.type) {
    case ADD_POST:
      // posts = [...state.posts, currentPost];
      return {
        ...state, 
        posts: [...state.posts, currentPost]
      }
    case DELETE_POST:
      // posts = state.posts.filter((item) => item.id !== currentPost.id)
      return {
        ...state, 
        posts: state.posts.filter((item) => item.id !== currentPost.id)
      };
    case POST_VOTE_UP:
      const [postUp] = state.posts.filter(item => item.id === currentPost.id);
      postUp.voteScore++;
      const postNewUp = state.posts.map(item => (
        item.id === currentPost.id ? postUp : item
      ))
      return {
        ...state,
        posts: [...postNewUp]
      };
    case POST_VOTE_DOWN:
      const [postDown] = state.posts.filter(item => item.id === currentPost.id);
      postDown.voteScore--;
      const postNewDown = state.posts.map(item => (
        item.id === currentPost.id ? postDown : item
      ))
      return {
        ...state,
        posts: [...postNewDown]
      };
    default:
      return state;
  }
};

const categoryActions = (state = initialStateCategories, action) => {
  const categoryList = action.categories;

  switch(action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: [...state.categories, categoryList]
      }
    default:
      return state;
  }
};

// const comment = (state = initialCommentsState, action) => {
//   const currentComment = action.comments;

//   switch(action.type) {
//     case ADD_COMMENT:
//       return [...state, currentComment];
//     default:
//       return state;
//   }
// };

export default combineReducers({
  postActions,
  categoryActions,
});