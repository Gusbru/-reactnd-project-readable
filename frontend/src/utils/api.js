
export const fetchPosts = () => (
  fetch(
    'http://localhost:3001/posts',
    {
      method: 'get',
      headers: { 
        'Authorization': 'whatever-you-want',
        'Content-Type' : 'application/json'
      }
    }
  )
  .then((res) => res.json())
  .catch(err => console.error('Error reading json -> ', err))
)