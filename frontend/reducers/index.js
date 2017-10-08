import {
    ADD_POST,
    DELETE_POST
} from '../actions'

const initialPostState = []

const post = (state = initialPostState, action) => {
    const { id, timestamp, title, body, author, category, voteScore, deleted } = action.post
    
    switch(action.type) {
        case ADD_POST:
            return [...initialPostState, action.post]
        case DELETE_POST:
            return state.filter((post) => post.id !== action.post.id)
        default:
            return state
    }
}

export default post