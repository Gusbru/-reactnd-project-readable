import {
    ADD_POST,
    DELETE_POST
} from '../actions'

const initialPostsState = [];

const post = (state = initialPostsState, action) => {
    //const { id, timestamp, title, body, author, category, voteScore, deleted } = action
    const currentPost = action.post;
    
    switch(action.type) {
        case ADD_POST:
            return [...state, currentPost]
        case DELETE_POST:
            return state.filter((item) => item.id !== currentPost.id)
        default:
            return state
    }
}

export default post