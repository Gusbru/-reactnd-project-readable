import React, { Component } from 'react';
import SimpleAppBar from './AppBar';
import EnhancedTable from './AppTables';
import PostList from './PostList';
import { connect } from 'react-redux';
import { addPost, deletePost } from '../actions';
import Modal from 'react-modal';
import { fetchPosts, writePost } from '../utils/api';
import uuidv1 from 'uuid/v1';
import Radio from 'material-ui/Radio';
import './App.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

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

  openModal = () => {
    this.setState(() => ({
      modalIsOpen: true
    }));
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
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

    // insert post to server
    console.log('writing post to server');
    writePost(currentPost);
    console.log('post written to server');

    this.setState({
      id         : '',
      timestamp  : '', 
      title      : '',
      body       : '',
      author     : '',
      category   : '',
      voteScore  : 1,
      deleted    : false,
    });

    if (this.state.modalIsOpen) {
      this.closeModal();
    }

  }

  removePost = (event) => {
    event.preventDefault();

    const id = event.target.value;
    console.log('removing postId = ', id);
    if (!id) {
      return;
    }

    this.props.removePost(id);
  }

  handlePostChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    this.setState({ [property] : value });
  }

  handlePostClick = (event) => {
    console.log(event.className);
    console.log(event.target.value);
  }
  
  retrievePosts = () => async (dispatch) => {
    console.log('Trying to retrieve the posts...');
    try {
      const posts = await fetchPosts();
      posts.map((item) => {
        this.props.insertPost(item);
      });
      console.log(this.props.postList);
    } catch(err) {
      console.error("Error retrieving posts...", err)
    }
  }
  

  render() {
    // console.log('Props', this.props);

    return (
      <div className="App">
        <SimpleAppBar title="My Posts"/>

        <p>
          We have {this.props.postList.length ? this.props.postList.length : 0} posts
        </p>

        <div>
          <button
            onClick={this.openModal}>
            Create New Post
          </button>
        </div>

        <div>
          <table>
            <tbody>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Category</th>
                <th>Author</th>
                <th>Date</th>
                <th>Score</th>
                <th>Action</th>
              </tr>

              {this.props.postList.map((item) => (
                <tr key={item.id} value={item.id}>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                  <td>{item.category}</td>
                  <td>{item.author}</td>
                  <td>{item.timestamp}</td>
                  <td>{item.voteScore}</td>
                  <td><button onClick={this.removePost} value={item.id}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'>
            <div>
              <div>
                Title:
                <input 
                  type='text'
                  name='title'
                  placeholder='Post title...'
                  value={this.state.title}
                  onChange={this.handlePostChange}
                />  
              </div>

              <div>
                Post Text:
                <textarea
                  type='text'
                  name='body'
                  placeholder='Post text...'
                  value={this.state.body}
                  onChange={this.handlePostChange}
                />
              </div>

              <div>
                Author:
                <input
                  type='text'
                  name='author'
                  placeholder='Author name'
                  value={this.state.author}
                  onChange={this.handlePostChange}
                />
              </div>

              <div>
                Category:
                <Radio name='category' value='react' onChange={this.handlePostChange} />React
                <Radio name='category' value='redux' onChange={this.handlePostChange} />Redux
                <Radio name='category' value='udacity' onChange={this.handlePostChange} />Udacity
              </div>
              

              <div>
                <button onClick={this.includePost}>
                  Post
                </button>
              
                <button onClick={this.closeModal}>
                  Cancel
                </button>
              </div>

            </div>
        </Modal>

        <div>
          <button onClick={this.retrievePosts()}>fetch</button>
        </div>

        {/* <EnhancedTable /> */}
        {/* <PostList test={this.props.postList}/> */}
      </div>
    );
  }
}

// connect component to redux Store
const mapStateToProps = (postList) => (
  {
    postList: postList.postActions.posts,
    // commentList: postList.comment
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    insertPost: (data) => dispatch(addPost(data)),
    removePost: (id) => dispatch(deletePost(id))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
