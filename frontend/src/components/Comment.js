import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import If from './If';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

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
                </TableRow>
              </TableHead>
              <TableBody>
                {comments.map(item => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.body}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>{item.timestamp}</TableCell>
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