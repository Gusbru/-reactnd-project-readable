import React, { Component } from 'react';
import { connect } from 'react-redux';
import If from './If';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui-icons/AddCircle';
import RemoveCircle from 'material-ui-icons/RemoveCircle';
import DeleteForever from 'material-ui-icons/DeleteForever';

class Comment extends Component {

  render(){

    const postId = this.props.id;
    const comments = this.props.commentList.filter(item => (
      item.parentId === postId
    ));

    return(
      <div>
        <If test={comments.length !== 0}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Comment</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Comment Score</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {comments.map(item => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.body}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>{item.timestamp}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <IconButton >
                        <AddCircle />
                      </IconButton>
                      <IconButton >
                        <RemoveCircle />
                      </IconButton>
                      <IconButton>
                        <DeleteForever />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </If>

        <If test={comments.length === 0}>
          <div>
            No comments to show...
          </div>
        </If>
      </div>
    )
  }

}

const mapStateToProps = (myActions) => (
  {
    commentList: myActions.commentActions.replies,
  }
);

export default connect(mapStateToProps,null)(Comment);