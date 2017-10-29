import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { writePost } from '../actions';
import uuidv1 from 'uuid/v1';
import If from './If';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 600,
  },
});

class NewPost extends Component {

  state = {
    id         : '',
    timestamp  : '',
    title      : '',
    body       : '',
    author     : '',
    category   : '',
    voteScore  : 0,
    deleted    : '',
    numberOfTries: 0,
  };

  componentWillReceiveProps(nextProps) {
    console.log('[NewPost] componentWillReceiveProps = ', nextProps.postToEdit)
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

    
    if(currentPost.category === ''){
      // number of tries
      this.setState({
        numberOfTries: this.state.numberOfTries+1
      })
      return;
    }
    
    // dispatch post to redux-store
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
            id='body'
            name='body'
            label='Post Content'
            multiline
            rowsMax="4"
            value={this.state.body}
            onChange={this.handlePostChange('body')}
            margin="normal"
            fullWidth
          />
          <TextField
            id='author'
            name='author'
            label='Author Name'
            value={this.state.author}
            onChange={this.handlePostChange('author')}
            margin="normal"
          />
          <TextField 
            id='category'
            name='category'
            select
            label='Category:'
            value={this.state.category}
            onChange={this.handlePostChange('category')}
            helperText="Please select a category"
            margin="normal"
            style={{menu: {width: 600}}}
          >
            <MenuItem key="all" name="category" value='all' disabled>Category</MenuItem> 
            <MenuItem key="react" name="category" value='react' selected>React</MenuItem> 
            <MenuItem key="redux" name="category" value='redux'>Redux</MenuItem> 
            <MenuItem key="udacity" name="category" value='udacity'>Udacity</MenuItem> 
          </TextField>
        </div>
      </div>
      <div>
          <Button 
            raised
            onClick={this.includeNewPost}>
            Post
          </Button>

          <Button 
            raised
            onClick={this.cancelPost}>
            Cancel
          </Button>
        </div>
        <If test={this.state.category === '' && this.state.numberOfTries !== 0}>
          <div>
            Please insert a category.
          </div>
        </If>
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
  withStyles(styles)(
    connect(null,mapDispatchToProps)(NewPost)
  )
);