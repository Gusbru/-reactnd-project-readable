import { combineReducers } from 'redux';
import {
  ADD_POST,
  DELETE_POST,
  GET_CATEGORIES,
  POST_VOTE_UP,
  POST_VOTE_DOWN,
  EDIT_POST,
  GET_COMMENTS,
  NUMBER_OF_COMMENTS,
  NEW_COMMENT,
  COMMENT_VOTE_UP,
  COMMENT_VOTE_DOWN,
  DELETE_COMMENT,
  EDIT_COMMENT,
} from '../actions';

const initialStatePosts = {
  posts: [],
}

const initialStateCategories = {
  categories: [],
}

const initialStateComments = {
  replies: [],
}




const postActions = (state = initialStatePosts, action) => {
  const currentPost = action.post;
  // let posts = [];
    
  switch(action.type) {
    case ADD_POST:
      // posts = [...state.posts, currentPost];
      return {
        ...state, 
        posts: [...state.posts, currentPost],
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
    case EDIT_POST:
      const [postToEdit] = state.posts.filter(item => item.id === currentPost.id);
      postToEdit.title = currentPost.title;
      postToEdit.body = currentPost.body;
      const newPosts = state.posts.map(item => item.id === currentPost.id ? postToEdit : item)
      return {
        ...state,
        posts: [...newPosts]
      }
    case NUMBER_OF_COMMENTS:
      const [comments] = state.posts.filter(item => item.id === currentPost.id);
      comments.numberComments++;
      const postWithComment = state.posts.map(item => item.id === currentPost.id ? comments : item);
      return {
        ...state,
        posts: [...postWithComment]
      }
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


const commentActions = (state = initialStateComments, action) => {
  const currentComment = action.comment;
  switch(action.type) {
    case GET_COMMENTS:
      return {
        ...state, 
        replies: [...state.replies, currentComment]
      };
    case NEW_COMMENT:
      return{
        ...state,
        replies: [...state.replies, currentComment]
      }
    case COMMENT_VOTE_UP:
      const [commentUp] = state.replies.filter(item => item.id === currentComment.id);
      if (commentUp.hasOwnProperty('voteScore')){
        commentUp.voteScore++;
      } else {
        commentUp.voteScore = 1
      }
      const commentNewUp = state.replies.map(item => (
        item.id === currentComment.id ? commentUp : item
      ))
      return {
        ...state,
        replies: [...commentNewUp]
      };
    case COMMENT_VOTE_DOWN:
      const [commentDown] = state.replies.filter(item => item.id === currentComment.id);
      if (commentDown.hasOwnProperty('voteScore')){
        commentDown.voteScore--;
      } else {
        commentUp.voteScore = -1
      }
      const commentNewDown = state.replies.map(item => (
        item.id === currentComment.id ? commentDown : item
      ))
      return {
        ...state,
        replies: [...commentNewDown]
      };
    case DELETE_COMMENT:
      const newComments = state.replies.filter(item => item.id !== currentComment.id);
      return {
        ...state,
        replies: [...newComments]
      }
    case EDIT_COMMENT:
      const [commentToEdit] = state.replies.filter(item => item.id === currentComment.id);
      commentToEdit.body = currentComment.body;
      const editComments = state.replies.map(item => item.id === currentComment.id ? commentToEdit : item)
      return {
        ...state,
        replies: [...editComments]
      }
    default:
      return state;
  }
};

export default combineReducers({
  postActions,
  categoryActions,
  commentActions,
});