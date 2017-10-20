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
)

export const writePost = (data) => (
  fetch(
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
        category: data.category
      })
    }
  )
  .then((res) => res.json())
  .catch(err => console.error('Error writing post to server ->', err))
)