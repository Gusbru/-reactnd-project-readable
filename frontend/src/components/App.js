import React, { Component } from 'react';
import SimpleAppBar from './AppBar';
import { Route, withRouter } from 'react-router-dom';
import PostList from './PostList';
import PostDetail from './PostDetail';
import NewPost from './NewPost'
import If from './If';
import { connect } from 'react-redux';
import { 
  writePost, 
  rmPost,
  retrievePosts,
  retrieveCategories,
  upPost,
  downPost,
} from '../actions';
import uuidv1 from 'uuid/v1';
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
    deleted    : false,
    postToEdit : ""
  };

  componentWillMount() {
    console.log("component will mount");
    this.props.retrievePosts();
    this.props.retrieveCategories();
  }
  

  removePost = (id) => {

    console.log('removing postId = ', id);
    if (!id) {
      return;
    }

    this.props.removePost(id);
    
  }

  handlePostClick = (id, category) => {
    console.log(id, category);
  }

  upVote = (id) => {
    console.log('botao voto up', id);
    this.props.voteUpPost(id);
  }

  downVote = (id) => {
    console.log('botao voto down', id)
    this.props.voteDownPost(id);
  }
  

  // get categories from server
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
        
        <Route
          exact
          path='/'
          render={() => (
            <PostList
              deletePost={this.removePost} 
              upVote={this.upVote}
              downVote={this.downVote} 
            />
        )}/>
        {console.log(this.props.location.pathname, 'path')}
        
        <If test={this.props.location.pathname !== '/create'}>
          <Route 
            path='/:category'
            exact
            render={({ match }) => (
              <PostList
                match={match}
                deletePost={this.removePost} 
                upVote={this.upVote}
                downVote={this.downVote}
              />
            )}
          />
        </If>

        <Route 
          path='/:category/:postId'
          exact
          render={({ match }) => (
            <PostDetail match={match}/>
          )}
        />

        <Route
          path='/create'
          exact
          render={() => (
            <NewPost />
          )}
        />

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
    voteUpPost: (id) => dispatch(upPost(id)),
    voteDownPost: (id) => dispatch(downPost(id)),
  }
)

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
