const url = 'http://localhost:3001';
// const url = 'http://10.1.1.10:3001';

export const fetchPosts = async () => (
  await fetch(
    url + '/posts',
    {
      method: 'GET',
      headers: { 
        'Authorization': 'whatever-you-want',
        'Content-Type' : 'application/json'
      }
    }
  )
  .then((res) => res.json())
  .catch(err => console.error('Error retrieving posts from server -> ', err))
);

export const fetchSinglePost = async (id) => (
  await fetch(
    url + `/posts/${id}`,
    {
      method: 'GET',
      headers: { 
        'Authorization': 'whatever-you-want',
        'Content-Type' : 'application/json'
      }
    }
  )
  .then(res => res.json())
  .catch(err => console.error('Error retrieving the post from server ->', err))
)

export const writePostAPI = async (data) => (
  await fetch(
    url + '/posts',
    {
      method: 'POST',
      headers: { 
        'Authorization': 'whatever-you-want',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        id: data.id,
        timestamp: data.timestamp,
        title: data.title,
        body: data.body,
        author: data.author,
        category: data.category,
      })
    }
  )
  .then((res) => res.json())
  .catch(err => console.error('Error writing post to server ->', err))
);

export const fetchCategories = async (data) => (
  await fetch(
    url + '/categories',
    {
      method: 'GET',
      headers: {
        'Authorization': 'whatever-you-want',
        'Content-Type' : 'application/json'
      },
    }
  )
  .then((res) => res.json())
  .catch(err => console.error('Error receiving categories -> ', err))
);

export const deletePostAPI = async (id) => (
  await fetch(
    url + `/posts/${id}`,
    {
      method: 'DELETE',
      headers: 
      {
        'Authorization': 'whatever-you-want',
        'Content-Type' : 'application/json'
      },
    },
  )
  .then((res) => res.json())
  .catch(err => console.error('Error deleting the post ->', err))
);

export const postUpVoteAPI = async (id) => (
  await fetch(
    url + `/posts/${id}`,
    {
      method: 'POST',
      headers: { 
        'Authorization': 'whatever-you-want',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        option: "upVote"
      })
    }
  )
  .then((res) => res.json())
  .catch(err => console.error('Error computing upVote to server ->', err))
);

export const postDownVoteAPI = async (id) => (
  await fetch(
    url + `/posts/${id}`,
    {
      method: 'POST',
      headers: { 
        'Authorization': 'whatever-you-want',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(
        {
          option: "downVote"
        }
      )
    }
  )
  .then((res) => res.json())
  .catch(err => console.error('Error computing downVote to server ->', err))
);

export const editPostAPI = async (data) => (
  await fetch(
    url + `/posts/${data.id}`,
    {
      method: 'PUT',
      headers: { 
        'Authorization': 'whatever-you-want',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(
        {
          title: data.title,
          body: data.body
        }
      )
    }
  )
  .then(res => res.json())
  .catch(err => console.error('Error editing post on the server ->', err))
)

export const fetchPostCommentAPI = async (id) => (
  await fetch(
    url + `/posts/${id}/comments`,
    {
      method: 'GET',
      headers: { 
        'Authorization': 'whatever-you-want',
        'Content-Type' : 'application/json'
      }
    }
  )
  .then(res => res.json())
  .catch(err => console.error('Error fetching post comment from server ->', err))
);

export const addPostCommentAPI = async (data, postId) => (
  await fetch(
    url + '/comments',
    {
      method: 'POST',
      headers: { 
        'Authorization': 'whatever-you-want',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(
        {
          id: data.id,
          timestamp: data.timestamp,
          body: data.body,
          author: data.author,
          parentId: postId
        }
      )
    }
  )
  .then(res => res.json())
  .catch(err => console.error('Error writing new post to server ->', err))
)

export const commentVoteAPI = async (id, upORdown) => (
  await fetch(
    url + `/comments/${id}`,
    {
      method: 'POST',
      headers: { 
        'Authorization': 'whatever-you-want',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        option: upORdown
      })
    }
  )
  .then(res => res.json())
  .catch(err => console.error('Error computing vote for a comment to server ->', err))
);

export const rmCommentAPI = async (id) => (
  await fetch(
    url + `/comments/${id}`,
    {
      method: 'DELETE',
      headers: { 
        'Authorization': 'whatever-you-want',
        'Content-Type' : 'application/json'
      },
    }
  )
  .then(res => res.json())
  .catch(err => console.error('Error deleting a comment', err))
)

export const editCommentAPI = async (data) => (
  await fetch(
    url + `/comments/${data.id}`,
    {
      method: 'PUT',
      headers: { 
        'Authorization': 'whatever-you-want',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        body: data.body,
        timestamp: data.timestamp
      })
    }
  )
  .then(res => res.json())
  .catch(err => console.error('Error updating comment', err))
)