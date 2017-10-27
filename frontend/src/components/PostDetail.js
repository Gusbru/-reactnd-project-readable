import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { writePost } from '../actions';
import Post from './Post';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import Cancel from 'material-ui-icons/Cancel';

class PostDetail extends Component {  

  state = {
    id         : '',
    timestamp  : '',
    title      : '',
    body       : '',
    author     : '',
    category   : '',
    voteScore  : '',
    deleted    : '',
    modalIsOpen: '',
  };

  componentWillReceiveProps(nextProps) {
    console.log('[PostDetail] componentWillReceiveProps = ', this.props.match.params.postId)
    this.setState(this.postToEdit(this.props.match.params.postId));
  }

  handlePostChange = name => event => {
    this.setState({ 
      [name] : event.target.value 
    });
  };

  postToEdit = (id) => {
    const [postToEdit] = this.props.postList.filter(item => item.id === id);
    return(postToEdit);
  }

  updatePost = () => {

  }

  cancelPost = () => {
    this.props.history.push('/');
  }

  render(){

    return(
      <div>
        Editing post id {this.props.match.params.postId}
        <div>
          <Button color="primary" aria-label="add" onClick={this.updatePost}>
            <Send />
          </Button>

          <Button color="primary" aria-label="add" onClick={this.cancelPost}>
            <Cancel />
          </Button>
        </div>

        <div>
          <TextField
            id='title'
            name='title'
            label='Post Title'
            value={this.state.title}
            onChange={this.handlePostChange('title')}
            margin="normal"
            fullWidth
          />
          <br/>
          <TextField 
            id='category'
            name='category'
            select
            label='Category:'
            value={this.state.category}
            onChange={this.handlePostChange('category')}
            helperText="Please select a category"
            margin="normal"
          >
            <MenuItem key="all" name="category" value='all' disabled>Category</MenuItem> 
            <MenuItem key="react" name="category" value='react' selected>React</MenuItem> 
            <MenuItem key="redux" name="category" value='redux'>Redux</MenuItem> 
            <MenuItem key="udacity" name="category" value='udacity'>Udacity</MenuItem> 
          </TextField>
        </div>

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