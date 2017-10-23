import { combineReducers } from 'redux';

import {
  ADD_POST,
  DELETE_POST, 
  ADD_COMMENT, 
  DELETE_COMMENT
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
  let posts = [];
    
  switch(action.type) {
    case ADD_POST:
      posts = [...state.posts, currentPost];
      return {...state, posts}
    case DELETE_POST:
      posts = state.posts.filter((item) => item.id !== currentPost.id)
      return {...state, posts};
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
  // comment
});