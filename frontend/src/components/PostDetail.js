import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  writePost,
  updatePost,
} from '../actions';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import Cancel from 'material-ui-icons/Cancel';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui-icons/AddCircle';
import RemoveCircle from 'material-ui-icons/RemoveCircle';

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
    isEditing  : false,
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
    return({...postToEdit, isEditing:false});
  }

  cancelPost = () => {
    this.props.history.push('/');
  }

  toggleEditing = () => {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  detailsToUpdate = () => {
    const data = {
      id: this.state.id,
      title: this.state.title,
      body: this.state.body
    }
    this.props.editPost(data);
  };

  render(){

    return(
      <div>
        
        <div>
          Post Details
        </div>

        <div>
          <TextField
            disabled={!this.state.isEditing}
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
            disabled={!this.state.isEditing}
            id='body'
            name='body'
            label='Post Content'
            value={this.state.body}
            onChange={this.handlePostChange('body')}
            margin="normal"
            fullWidth
          />
          <TextField
            disabled
            id='author'
            name='author'
            label='Author Name'
            value={this.state.author}
            onChange={this.handlePostChange('author')}
            margin="normal"
          />
          <TextField
            disabled
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
          <div>
            <TextField
              disabled
              id='voteScore'
              name='voteScore'
              label='Score'
              value={this.state.voteScore}
              margin="normal"
            />
            <IconButton onClick={() => this.props.upVote(this.state.id)}>
              <AddCircle />
            </IconButton>
            <IconButton onClick={() => this.props.downVote(this.state.id)}>
              <RemoveCircle />
            </IconButton>
          </div>
        </div>
        <div>
          <Button 
            raised
            onClick={this.toggleEditing} >
            Edit
          </Button>
          <Button
            raised
            onClick={this.detailsToUpdate}>
            Save
          </Button>
          <Button raised>
            Add Comment
          </Button>
          <Button 
            raised 
            onClick={this.cancelPost}>
            Cancel
          </Button>
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
    editPost  : (data) => dispatch(updatePost(data)),
  }
);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetail)
);