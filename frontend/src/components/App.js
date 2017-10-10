import React, { Component } from 'react';
import SimpleAppBar from './AppBar';
import EnhancedTable from './AppTables';
import { addPost, deletePost } from '../actions'
import './App.css';

class App extends Component {
  state = {
    postsList: []
  }

  componentDidMount() {
    const { store } = this.props;

    store.subscribe(() => {
      this.setState(() => ({
        postsList: store.getState()
      }))
    })
  }

  submitPost = () => {
    this.props.store.dispatch(addPost({
      id: this.input.value,
      timestamp: 'timestamp', 
      title: 'post title',
      body: 'none',
      author: 'author',
      category: 'pick one',
      voteScore: 3,
      deleted: false
    }))

    this.input.value = '';

  }

  removePost = (id) => {
    this.props.store.dispatch(deletePost({id}))
  }

  render() {
    return (
      <div className="App">
        <SimpleAppBar title="My Posts"/>
        
        <input
          type="text"
          ref={(input) => this.input = input}
          placeholder="type text"
        />
        <button onClick={this.submitPost}>Submit</button>
        
        <pre>
          We have a {this.state.postsList && this.state.postsList.map((item) => (
            <div key={item.id}>
              <li>{item.id}</li>
              <button onClick={() => this.removePost(item.id)}>X</button>
            </div>
          ))}
        </pre>
        
        {/* <EnhancedTable /> */}
      </div>
    );
  }
}

export default App;
