import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddPost extends Component {
  render(){
    return(
      <div>
        <Link to='/'>Back</Link>
      </div>
    );
  }
}

export default AddPost;