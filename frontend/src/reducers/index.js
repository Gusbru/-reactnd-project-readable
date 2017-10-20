import { combineReducers } from 'redux';

import {
  ADD_POST,
  DELETE_POST, 
  ADD_COMMENT, 
  DELETE_COMMENT
} from '../actions';

const initialPostsState = [];
const initialCommentsState = [];

const post = (state = initialPostsState, action) => {
  const currentPost = action.post;
    
  switch(action.type) {
    case ADD_POST:
      return [...state, currentPost];
    case DELETE_POST:
      return state.filter((item) => item.id !== currentPost.id);
    default:
      return state;
  }
}

const comment = (state = initialCommentsState, action) => {
  const currentComment = action.comments;

  switch(action.type) {
    case ADD_COMMENT:
      return [...state, currentComment];
    default:
      return state;
  }
};

export default combineReducers({
  post,
  comment
});