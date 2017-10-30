import React, { Component } from 'react';
import { connect } from 'react-redux';
import If from './If';
import { 
  createNewComment,
  commentVote,
  removeComment,
  updateComment,
} from '../actions';
import uuidv1 from 'uuid/v1';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui-icons/AddCircle';
import RemoveCircle from 'material-ui-icons/RemoveCircle';
import DeleteForever from 'material-ui-icons/DeleteForever';
import Edit from 'material-ui-icons/Edit';
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
    id         : '',
    parentId   : '',
    author     : '',
    body       : '',
    timestamp  : '',
    voteScore  : 1,
    modalIsOpen: false,
    isEditing  : false,
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
      voteScore: 1,
      isEditing: false,
    }

    // update local state
    this.setState(currentComment);


    // dispatch comment to redux-store
    this.props.insertComment(currentComment, this.state.parentId);

    
    // back to comments
    this.closeModal();
    
  }

  openModal = () => {
    this.setState(
      {modalIsOpen: true}
    )
  }

  closeModal = () => {
    console.log('closing modal')
    this.setState({
      id         : '',
      parentId   : '',
      author     : '',
      body       : '',
      timestamp  : '',
      voteScore  : 1,
      modalIsOpen: false,
      isEditing  : false,
    });
  }

  handleVote = (event, id) => {
    switch(event) {
      case "upVote":
        this.props.voteComment(id, event);
        break;
      case "downVote":
        this.props.voteComment(id, event);
        break;
      default:
        break;
    }
  }

  removeComment = (id) => {
    this.props.deleteComment(id);
  };

  editComment = (id) => {
    const [currentCommet] = this.props.commentList.filter(item => item.id === id);
    this.setState({...currentCommet, isEditing:true});
    this.openModal();
  };

  updateComment = () => {
    this.props.editComment(this.state);
    this.closeModal();
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
                      <IconButton onClick={(event) => this.handleVote('downVote', item.id)}>
                        <RemoveCircle />
                      </IconButton>
                      <IconButton onClick={() => this.editComment(item.id)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => this.removeComment(item.id)}>
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
              disabled={this.state.isEditing}
              value={this.state.author}
              onChange={this.handlePostChange('author')}
              margin="normal"
            />
          </div>
          <div>
            {this.state.isEditing
              ? 
                <Button onClick={this.updateComment}>
                  Update Comment
                </Button>
              :
                <Button onClick={this.includeNewComment}>
                  Add Comment
                </Button>
              }
            
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
    voteComment: (commentId, voteType) => dispatch(commentVote(commentId, voteType)),
    deleteComment: (id) => dispatch(removeComment(id)),
    editComment: (data) => dispatch(updateComment(data)),
  }
);

export default connect(mapStateToProps,mapDispatchToProps)(Comment);