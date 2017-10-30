import React, { Component } from 'react';
import { connect } from 'react-redux';
import If from './If';
import { 
  createNewComment,
  upComment,
} from '../actions';
import uuidv1 from 'uuid/v1';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui-icons/AddCircle';
import RemoveCircle from 'material-ui-icons/RemoveCircle';
import DeleteForever from 'material-ui-icons/DeleteForever';
import { formatDate } from '../utils/formatDate';
import Modal from 'react-modal';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

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

    // update local state
    this.setState(currentComment);

    // back to comments
    this.closeModal();
    
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

  handleVote = (event, id) => {
    switch(event) {
      case "upVote":
        this.props.upVoteComment(id);
        break;
      case "downVote":
        //this.props.downVote(id);
        break;
      default:
        break;
    }
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
        <div>
          This post have {comments.length ? comments.length : '0 (zero)'} comments
        </div>
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
                    <TableCell>{item.voteScore}</TableCell>
                    <TableCell>
                      <IconButton onClick={(event) => this.handleVote('upVote', item.id)}>
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
          style={customStyles}
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

};

const mapStateToProps = (myActions) => (
  {
    commentList: myActions.commentActions.replies,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    insertComment: (data, postId) => dispatch(createNewComment(data, postId)),
    upVoteComment: (commentId) => dispatch(upComment(commentId)),
  }
);

export default connect(mapStateToProps,mapDispatchToProps)(Comment);