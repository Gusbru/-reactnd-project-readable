import React, { Component } from 'react';
import SimpleAppBar from './AppBar';
import { Route, withRouter, Switch, BrowserRouter } from 'react-router-dom';
import PostList from './PostList';
import PostDetail from './PostDetail';
import NewPost from './NewPost';
import { connect } from 'react-redux';
import { 
  writePost, 
  rmPost,
  retrievePosts,
  retrieveCategories,
  upPost,
  downPost,
  fetchCommentForPost,
} from '../actions';
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
    this.props.retrievePosts();
    this.props.retrieveCategories();
  };
  

  removePost = (id) => {
    if (!id) {
      return;
    }
    this.props.removePost(id);
  };

  upVote = (id) => {
    this.props.voteUpPost(id);
  };

  downVote = (id) => {
    this.props.voteDownPost(id);
  };
  

  // get categories from server
  categories = () => (
    this.props.categoryList.map(item => (
      item.name
    ))
  );
  
  render() {
    return (
      <div className="App">
        <SimpleAppBar title="My Posts" categories={this.categories()}/>
        
        <Switch>
          
          <Route
            path='/create'
            exact
            render={() => (
              <NewPost />
            )}
          />

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
          
          
          
          {
            ['/', ...this.props.categoryList.map(item => '/'+item.path)].includes(this.props.location.pathname)
            ? <Route 
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

            : this.props.postList.map(item => '/'+item.category+'/'+item.id).includes(this.props.location.pathname)
                ? <Route 
                    path='/:category/:postId'
                    exact
                    render={({ match }) => (
                      <PostDetail 
                        match={match}
                        categoryList={this.props.categoryList}
                        upVote={this.upVote}
                        downVote={this.downVote}
                      />
                    )}
                  />  
                : <Route component={NoMatch}/>
          }


        </Switch>
      </div>
      
    );
  }
}

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)


// connect component to redux Store
const mapStateToProps = (myActions) => (
  {
    postList: myActions.postActions.posts,
    categoryList: myActions.categoryActions.categories,
    commentList: myActions.commentActions.replies,
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
    retrieveComments: (id) => dispatch(fetchCommentForPost(id)),
  }
)

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
