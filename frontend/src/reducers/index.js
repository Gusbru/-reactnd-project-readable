import {
    ADD_POST,
    DELETE_POST
} from '../actions'

const initialPostState = [
    {
        id: '0',
        timestamp: 'now', 
        title: 'sample title', 
        body: 'blablabla', 
        author:'anonymous', 
        category: 'react', 
        voteScore: 2, 
        deleted: false
    }
];

const post = (state = initialPostState, action) => {
    const { id, timestamp, title, body, author, category, voteScore, deleted } = action
    
    switch(action.type) {
        case ADD_POST:
            return [...initialPostState.posts, action.post]
        case DELETE_POST:
            return state.posts.filter((post) => post.id !== action.post.id)
        default:
            return state
    }
}


export default post