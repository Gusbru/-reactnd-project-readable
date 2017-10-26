import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';


class Post extends Component {

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

  updatePost = (state) => {
    this.setState(state)
  }

  render() {
    return(
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
    );
  };
};

export default Post;