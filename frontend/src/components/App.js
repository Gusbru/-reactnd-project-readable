import React, { Component } from 'react';
import SimpleAppBar from './AppBar';
import { Route, Link, withRouter } from 'react-router-dom';
import PostList from './PostList';
import { connect } from 'react-redux';
import { 
  writePost, 
  rmPost,
  retrievePosts,
  retrieveCategories,
  upPost,
} from '../actions';
import Modal from 'react-modal';
import uuidv1 from 'uuid/v1';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Send from 'material-ui-icons/Send';
import Cancel from 'material-ui-icons/Cancel';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import './App.css';

class App extends Component {

  state = {
    modalIsOpen: false,
    id         : '',
    timestamp  : '', 
    title      : '',
    body       : '',
    author     : '',
    category   : '',
    voteScore  : 1,
    deleted    : false
  };

  componentWillMount() {
    console.log("component will mount");
    this.props.retrievePosts();
    this.props.retrieveCategories();
  }

  openModal = () => {
    this.setState(() => ({
      modalIsOpen: true
    }));
  }

  closeModal = () => {
    this.setState(() => ({
      modalIsOpen: false
    }))
  }
  
  includePost = (event) => {

    event.preventDefault();

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

    // insert post to redux-store
    this.props.insertPost(currentPost);

    // // insert post to server
    // console.log('writing post to server');
    // writePost(currentPost);
    // console.log('post written to server');

    this.setState({
      id           : '',
      timestamp    : '', 
      title        : '',
      body         : '',
      author       : '',
      category     : '',
      voteScore    : 1,
      deleted      : false,
    });

    if (this.state.modalIsOpen) {
      this.closeModal();
    }

  }

  removePost = (id) => {

    console.log('removing postId = ', id);
    if (!id) {
      return;
    }

    this.props.removePost(id);
    
  }

  handlePostChange = name => event => {
    this.setState({ 
      [name] : event.target.value 
    });
  }

  handlePostClick = (id) => {
    console.log(id);

  }

  upVote = (id) => {
    console.log('botao voto up', id)
    this.props.voteUpPost(id);
  }
  

  // TODO: get categories from server
  categories = () => (
    this.props.categoryList.map(item => (
      item.name
    ))
  )
  
  render() {
    //console.log('Props', this.props);


    return (
      <div className="App">

        <SimpleAppBar title="My Posts" categories={this.categories()}/>
        
        <div>
          <Button fab color="primary" aria-label="add" onClick={this.openModal}>
            <AddIcon />
          </Button>
        </div> 

        
        
        <Route exact path='/' render={() => (
            <PostList handlePostClick={this.handlePostClick} deletePost={this.removePost} upVote={this.upVote} filterCategory={"All"}/>
        )}/>

        {/* TODO: loop over all categories */}
        <Route path='/udacity' render={() => (
          <PostList handlePostClick={this.handlePostClick} deletePost={this.removePost} filterCategory={"udacity"}/>
        )}/>

        <Route path='/react' render={() => (
          <PostList handlePostClick={this.handlePostClick} deletePost={this.removePost} filterCategory={"react"}/>
        )}/>

        <Route path='/redux' render={() => (
          <PostList handlePostClick={this.handlePostClick} deletePost={this.removePost} filterCategory={"redux"}/>
        )}/>
        
       

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'>
            <div>
            <div>
                <Button color="primary" aria-label="add" onClick={this.includePost}>
                  <Send />
                </Button>

                <Button color="primary" aria-label="add" onClick={this.closeModal}>
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
                <TextField 
                  id='body'
                  name='body'
                  label='Post text...'
                  multiline
                  fullWidth
                  rows="4"
                  margin="normal"
                  value={this.state.body}
                  onChange={this.handlePostChange('body')}
                />
                <TextField 
                  id='author'
                  name='author'
                  label='Author Name'
                  value={this.state.author}
                  onChange={this.handlePostChange('author')}
                />
                <TextField 
                  id='category'
                  name='category'
                  select
                  label='Category:'
                  value={this.state.category}
                  onChange={this.handlePostChange('category')}
                  SelectProps={{
                    MenuProps: {
                      className: "category",
                    },
                  }}
                  helperText="Please select a category"
                  margin="normal"
                >
                 <MenuItem key="react" name="category" value='react'>React</MenuItem> 
                 <MenuItem key="redux" name="category" value='redux'>Redux</MenuItem> 
                 <MenuItem key="udacity" name="category" value='udacity'>Udacity</MenuItem> 
                </TextField>
              </div>
            </div>
        </Modal>

      </div>
    );
  }
}

// connect component to redux Store
const mapStateToProps = (myActions) => (
  {
    postList: myActions.postActions.posts,
    categoryList: myActions.categoryActions.categories,
    // commentList: postList.comment
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    insertPost: (data) => dispatch(writePost(data)),
    removePost: (id) => dispatch(rmPost(id)),
    retrievePosts: () => dispatch(retrievePosts()),
    retrieveCategories: () => dispatch(retrieveCategories()),
    voteUpPost: (id) => dispatch((upPost(id))),
  }
)

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
