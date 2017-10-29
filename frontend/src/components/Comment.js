import React, { Component } from 'react';
import { connect } from 'react-redux';
import If from './If';
import { createNewComment } from '../actions';
import uuidv1 from 'uuid/v1';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui-icons/AddCircle';
import RemoveCircle from 'material-ui-icons/RemoveCircle';
import DeleteForever from 'material-ui-icons/DeleteForever';
import { formatDate } from '../utils/formatDate';
import Modal from 'react-modal'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

class Comment extends Component {

  state = {
    id       : '',
    parentId : '',
    author   : '',
    body     : '',
    timestamp: '',
    voteScore: 0,
    modalIsOpen: false,
  }

  componentWillReceiveProps(nextProps) {
    const parentId = this.props.id;
    this.setState({
      parentId
    });
  }

  handlePostChange = name => event => {
    this.setState({ 
      [name] : event.target.value 
    });
  };

  includeNewComment = () => {
    
    const currentComment = {
      id       : uuidv1(),
      parentId : this.state.parentId,
      author   : this.state.author,
      body     : this.state.body,
      timestamp: Date.now(),
      voteScore: 0,
    }

    // dispatch comment to redux-store
    this.props.insertComment(currentComment, this.state.parentId);

    // back to comments
    this.closeModal()
    
  }

  openModal = () => {
    // console.log('openModal')
    //this.setState({modalIsOpen: true});
    this.setState(
      {modalIsOpen: true}
    )
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }


  render(){

    const postId = this.props.id;
    const comments = this.props.commentList.filter(item => (
      item.parentId === postId
    ));

    return(
      <div>
        <Button 
          raised 
          onClick={this.openModal}>
          Add New Comment
        </Button>
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
                    <TableCell>{formatDate(item.timestamp)}</TableCell>
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


        {/* Modal to Inser a new Comment */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <div>
            <TextField
              id='body'
              name='body'
              label='Insert Comment'
              multiline
              rowsMax="4"
              value={this.state.body}
              onChange={this.handlePostChange('body')}
              margin="normal"
              fullWidth
            />
            <TextField
              id='author'
              name='author'
              label='Author Name'
              value={this.state.author}
              onChange={this.handlePostChange('author')}
              margin="normal"
            />
          </div>
          <div>
            <Button onClick={this.includeNewComment}>
              Add Comment
            </Button>
            <Button onClick={this.closeModal}>
              Close
            </Button>
          </div>
        </Modal>

      </div>
    )
  }

}

const mapStateToProps = (myActions) => (
  {
    commentList: myActions.commentActions.replies,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    insertComment: (data, postId) => dispatch(createNewComment(data, postId))
  }
)

export default connect(mapStateToProps,mapDispatchToProps)(Comment);