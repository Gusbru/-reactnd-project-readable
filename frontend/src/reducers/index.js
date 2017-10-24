import { combineReducers } from 'redux';

import {
  ADD_POST,
  DELETE_POST,
  GET_CATEGORIES,
} from '../actions';

const initialState = {
  users: {},
  modal: {},
  posts: [],
  replies: {},
  listeners: {},
  categories: []
}


const postActions = (state = initialState, action) => {
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
    default:
      return state;
  }
};

const categoryActions = (state = initialState, action) => {
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