import React, { Component } from 'react';
import SimpleAppBar from './AppBar';
import { Route, withRouter, Switch, BrowserRouter } from 'react-router-dom';
import PostList from './PostList';
import PostDetail from './PostDetail';
import NewPost from './NewPost'
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
    console.log("[App]component will mount");
    this.props.retrievePosts();
    this.props.retrieveCategories();
  };
  

  removePost = (id) => {

    console.log('removing postId = ', id);
    if (!id) {
      return;
    }
    this.props.removePost(id);
  };

  handlePostClick = (id, category) => {
    console.log(id, category);
  };

  upVote = (id) => {
    console.log('botao voto up', id);
    this.props.voteUpPost(id);
  };

  downVote = (id) => {
    console.log('botao voto down', id)
    this.props.voteDownPost(id);
  };
  

  // get categories from server
  categories = () => (
    this.props.categoryList.map(item => (
      item.name
    ))
  );

  fetchComment = (id) => {
    this.props.retrieveComments(id);
  }
  
  render() {
    //console.log('Props', this.props);


    return (
      <BrowserRouter>
        <div className="App">
          <SimpleAppBar title="My Posts" categories={this.categories()}/>
          
          <Switch>
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
            
            <Route
              path='/create'
              exact
              render={() => (
                <NewPost />
              )}
            />

            <Route 
              path='/:category/:postId'
              exact
              render={({ match }) => (
                <PostDetail 
                  match={match}
                  upVote={this.upVote}
                  downVote={this.downVote}
                />
              )}
            />

            
            <Route 
              path='/:category'
              exacr
              render={({ match }) => (
                <PostList
                  match={match}
                  deletePost={this.removePost} 
                  upVote={this.upVote}
                  downVote={this.downVote}
                />
              )}
            />

            <Route component={NoMatch}/>
          </Switch>
        </div>
      </BrowserRouter>
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
