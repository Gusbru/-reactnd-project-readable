import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { writePost } from '../actions';
import Post from './Post';

class PostDetail extends Component {  

  postToEdit = (id) => {
    const [postToEdit] = this.props.postList.filter(item => item.id === id);
    return(postToEdit);
  }

  render(){

    return(
      <div>
        Editing post id {this.props.match.params.postId}

        <Post postToEdit={this.postToEdit(this.props.match.params.postId)}/>

      </div>
    );
  };
};

const mapStateToProps = (myActions) => (
  {
    postList: myActions.postActions.posts,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    insertPost: (data) => dispatch(writePost(data)),
  }
);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
);