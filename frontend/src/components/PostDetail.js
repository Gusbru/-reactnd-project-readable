import React, { Component } from 'react';

class PostDetail extends Component {
  render(){
    console.log('props inside postdetails', this.props)
    return(
      <div>
        The category is {this.props.match.params.category}
        <br/>
        The number is {this.props.match.params.postId}
      </div>
    );
  };
};

export default PostDetail;