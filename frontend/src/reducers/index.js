import {
  ADD_POST,
  DELETE_POST
} from '../actions';

const initialPostsState = [
  {
    id: '1',
    timestamp: '3498534', 
    title: 'post-title',
    body: 'post body',
    author: 'post author',
    category: 'redux',
    voteScore: 1,
    deleted: false
  },
  {
    id: '2',
    timestamp: '3498534', 
    title: 'post-title',
    body: 'post body',
    author: 'post author',
    category: 'redux',
    voteScore: 1,
    deleted: false
  }
];

const post = (state = initialPostsState, action) => {
  //const { id, timestamp, title, body, author, category, voteScore, deleted } = action
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

export default post;