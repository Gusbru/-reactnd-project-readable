import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class PostList extends Component {
  
  handleDeleteButton = (event, id) => {
    console.log('delete clicked', event.target.value, id);
    if (event.target.value === 'delete') {
      this.props.deletePost(id);
    }
  }


  handleVote = (event, id) => {
    if (event.target.value === 'upVote') {
      this.props.upVote(id);
    } else if (event.target.value === 'downVote') {
      this.props.downVote(id);
    }
  }

  formatDate = (milliseconds) => {
    const dataFormated = new Date(milliseconds);
    const day = dataFormated.getDate();
    const month = dataFormated.getMonth()+1;
    const year = dataFormated.getFullYear();
    const hour = dataFormated.getHours();
    const minutes = dataFormated.getMinutes();
    const seconds = dataFormated.getSeconds();
    return(
      `${day}/${month}/${year} at ${hour}:${minutes}:${seconds}`
    )
  }

  render() {
  console.log("filterCategory = ", this.props.filterCategory);

  const posts = this.props.postList.filter(_ => _.category === this.props.filterCategory || this.props.filterCategory === 'All');
  
  return(
    <div>
      <p>We have {posts.length ? posts.length : 0} posts in the category: {this.props.filterCategory}</p>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((item) => (
              <TableRow 
                key={item.id} 
                value={item.id}
                hover
                onClick={event => this.props.handlePostClick(item.id)}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{this.formatDate(item.timestamp)}</TableCell>
                  <TableCell>{item.voteScore}</TableCell>
                  <TableCell>
                    <button value="upVote" onClick={event => this.handleVote(event, item.id)}>+</button>
                    <button value="downVote" onClick={event => this.handleVote(event, item.id)}>-</button>
                    <button value="delete" onClick={event => this.handleDeleteButton(event, item.id)}>Delete</button>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
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
    
  }
)


export default connect(mapStateToProps, mapDispatchToProps)(PostList);