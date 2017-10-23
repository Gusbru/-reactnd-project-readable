import React from 'react';
import { connect } from 'react-redux';
import { addPost, 
  deletePost,
  retrievePosts 
 } from '../actions';

import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

const PostList = (props) => (
  <Paper>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell>Title</TableCell>
        {/* <TableCell>Content</TableCell> */}
        <TableCell>Category</TableCell>
        <TableCell>Author</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Score</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {props.postList
      .filter(_ => _.category === props.filterCategory || props.filterCategory === 'all')
      .map((item) => (
          <TableRow 
            key={item.id} 
            value={item.id}
            hover
            onClick={event => props.handlePostClick(event, item.id)}
            role="checkbox" >
            <TableCell padding="checkbox"><Checkbox /></TableCell>
            <TableCell>{item.title}</TableCell>
            {/* <TableCell>{item.body}</TableCell> */}
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.author}</TableCell>
            <TableCell>{item.timestamp}</TableCell>
            <TableCell>{item.voteScore}</TableCell>
          </TableRow>
        ))}
    </TableBody>
  </Table>
</Paper>
  
)

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
    removePost: (id) => dispatch(deletePost(id)),
    retrievePosts: () => dispatch(retrievePosts())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(PostList);