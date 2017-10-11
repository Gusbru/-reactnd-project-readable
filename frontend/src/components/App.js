import React, { Component } from 'react';
import SimpleAppBar from './AppBar';
import EnhancedTable from './AppTables';
import { connect } from 'react-redux';
import { addPost, deletePost } from '../actions'
import './App.css';

class App extends Component {
  includePost = () => {
    this.props.insertPost({

    });
  }
  render() {
    console.log('Props', this.props);
    return (
      <div className="App">
        <SimpleAppBar title="My Posts"/>

        <p>
          We have {this.props.postList.length} posts
        </p>

        <div>
          {this.props.postList.map((item) => (
            <li key={item.id}>{item.body}</li>
          ))}
        </div>

        <div>
          <input type='text' ></input>
          <button>Submit</button>
        </div>

        {/* <EnhancedTable /> */}
      </div>
    );
  }
}

// connect component to redux Store
const mapStateToProps = (postList) => (
  {postList}
)

const mapDispatchToProps = (dispatch) => (
  {
    insertPost: (data) => dispatch(addPost(data)),
    removePost: (id) => dispatch(deletePost(id))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
