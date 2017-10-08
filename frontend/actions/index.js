export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const 

export function addPost({ id, timestamp, title, body, author, category, voteScore, deleted }) {
    return {
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
}

export function deletePost({ id }) {
    return {
        type: DELETE_POST,
        id
    }
}