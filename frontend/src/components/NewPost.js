import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { writePost } from '../actions';
import Post from './Post';
import uuidv1 from 'uuid/v1';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import Cancel from 'material-ui-icons/Cancel';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';

class NewPost extends Component {

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
    console.log('[PostDetail] componentWillReceiveProps = ', nextProps.postToEdit)
    this.setState(nextProps.postToEdit);
  }

  handlePostChange = name => event => {
    this.setState({ 
      [name] : event.target.value 
    });
  };

  includeNewPost = () => {
    
    const currentPost = {
      id        : uuidv1(),
      timestamp : Date.now(), 
      title     : this.state.title,
      body      : this.state.body,
      author    : this.state.author,
      category  : this.state.category,
      voteScore : this.state.voteScore,
      deleted   : this.state.deleted
    }

    
    if(currentPost.category===''){
      console.log("you need to fill the category")
      return;
    }
    
    // insert post to redux-store
    this.props.insertPost(currentPost);
     
    // back to main
    this.props.history.push('/');
     
  }

  cancelPost = () => {
    this.props.history.push('/');
  }

  render(){
    return(
      <div>
        <div>
          <Button color="primary" aria-label="add" onClick={this.includeNewPost}>
            <Send />
          </Button>

          <Button color="primary" aria-label="add" onClick={this.cancelPost}>
            <Cancel />
          </Button>
        </div>
        
        <div>
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

      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => (
  {
    insertPost: (data) => dispatch(writePost(data)),
  }
)

export default withRouter(
  connect(null,mapDispatchToProps)(NewPost)
);