const url = 'http://localhost:3001';

export const fetchPosts = () => (
  fetch(
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
      body: JSON.stringify({
        option: "downVote"
      })
    }
  )
  .then((res) => res.json())
  .catch(err => console.error('Error computing downVote to server ->', err))
);