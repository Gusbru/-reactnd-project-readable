import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { writePost } from '../actions';
import uuidv1 from 'uuid/v1';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';

class PostDetail extends Component {

  state = {
    id         : '',
    timestamp  : '', 
    title      : '',
    body       : '',
    author     : '',
    category   : '',
    voteScore  : 1,
    deleted    : false,
    modalIsOpen: '',
  };

  componentDidMount() {
    this.setState(this.props.postToEdit);
  }

  handlePostChange = name => event => {
    this.setState({ 
      [name] : event.target.value 
    });
  };


  render(){

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