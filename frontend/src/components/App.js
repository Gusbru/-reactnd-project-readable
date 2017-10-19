import React, { Component } from 'react';
import SimpleAppBar from './AppBar';
import EnhancedTable from './AppTables';
import { connect } from 'react-redux';
import { addPost, deletePost } from '../actions';
import Modal from 'react-modal';
import { fetchPosts } from '../utils/api';
import uuidv1 from 'uuid/v1';
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
    voteScore  : '',
    deleted    : ''
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
    console.log('include post', event.target.value)
    if (!event.target.value) {
      return;
    }

    event.preventDefault();

    const postBody = event.target.value;

    this.props.insertPost({
        id:uuidv1(),
        timestamp:Date.now(), 
        title:"bla",
        body: postBody,
        author:"bla",
        category:"bla",
        voteScore:"bla",
        deleted:"bla"
    });

    this.setState({ body: '' });

    if (this.state.modalIsOpen) {
      this.closeModal();
    }

  }

  removePost = () => {
    this.props.deletePost(
      {}
    )
  }

  handlePostChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    this.setState({ [property] : value });
  }

  handleOnSubmit = (event) => {

    event.preventDefault();
  }
  
  retrievePosts = () => async (dispatch) => {
    console.log('Trying to retrieve the posts...');
    try {
      const posts = await fetchPosts();
      console.log(posts);
      posts.map((item) => {
        this.props.insertPost(item);
      })
    } catch(err) {
      console.error("Error retrieving posts...", err)
    }
  }

  

  

  render() {
    console.log('Props', this.props);

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
          {this.props.postList.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'>
            <div>
              <div>
                Post Text:
                <input
                  type='text'
                  name='body'
                  placeholder='Post text...'
                  value={this.state.body}
                  onChange={this.handlePostChange}
                />
              </div>

              <div>
                <button 
                  onClick={this.includePost}
                  value={this.state.body}>
                    Post
                </button>
              
                <button
                  onClick={this.closeModal}>
                  Cancel
                </button>
              </div>

            </div>
        </Modal>

        <div>
          <button onClick={this.retrievePosts()}>fetch</button>
        </div>

        {/* <EnhancedTable /> */}
      </div>
    );
  }
}

// connect component to redux Store
const mapStateToProps = (postList, commentList) => (
  {
    postList: postList.post,
    commentList: postList.comment
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    insertPost: (data) => dispatch(addPost(data)),
    removePost: (id) => dispatch(deletePost(id))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
