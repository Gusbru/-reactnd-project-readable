import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui-icons/AddCircle';
import RemoveCircle from 'material-ui-icons/RemoveCircle';
import DeleteForever from 'material-ui-icons/DeleteForever';
import Info from 'material-ui-icons/Info';
import { formatDate } from '../utils/formatDate';


class PostList extends Component {

  state = {
    sortType: ''
  }
  
  handleDeleteButton = (event, id) => {
    console.log('delete clicked', event, id);
    if (event === 'delete') {
      this.props.deletePost(id);
    }
  }

  handleVote = (event, id) => {
    switch(event) {
      case "upVote":
        this.props.upVote(id);
        break;
      case "downVote":
        this.props.downVote(id);
        break;
      default:
        break;
    }
  }

  fetchCommentNumber = (id) => {
    this.props.countComments(id)
  }

  sortBy = (type) => {
    this.setState({
      sortType: type
    })
    console.log('sorte by', type, this.state);
  }
  

  render() {
    const filterCategory = this.props.match.params.category ? this.props.match.params.category : "All";

    // if(this.state.sortType === 'score') {
    //   const postsOrdered = this.props.postList.filter(_ => _.category === filterCategory || filterCategory === 'All').sort((a,b) => {
    //     if(a.voteScore > b.voteScore){
    //       return 1;
    //     }
    //     if(a.voteScore < b.voteScore){
    //       return -1;
    //     }
    //     return 0;
    //   });
    // } else if(this.state.sortType === 'date') {
    //   const postsOrdered = this.props.postList.filter(_ => _.category === filterCategory || filterCategory === 'All').sort((a,b) => {
    //     if(a.timestamp > b.timestamp){
    //       return 1;
    //     }
    //     if(a.timestamp < b.timestamp){
    //       return -1;
    //     }
    //     return 0;
    //   });
    // } else {
    //   const postsOrdered = this.props.postList.filter(_ => _.category === filterCategory || filterCategory === 'All')
    // }
    
    
    
    const posts = this.props.postList.filter(_ => _.category === filterCategory || filterCategory === 'All');
    
    
    
    return(
      <div>

        <div>
          <Button fab color="primary" aria-label="add" component={Link} to={'/create'}>
            <AddIcon />
          </Button>
        </div> 

        <p>We have {posts.length ? posts.length : 0} posts in the category: {filterCategory}</p>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell># of Comments</TableCell>
                <TableCell>Category</TableCell>
                <TableCell onClick={() => this.sortBy('date')}>Date</TableCell>
                <TableCell onClick={() => this.sortBy('score')}>Score</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((item) => (
                  <TableRow 
                    key={item.id} 
                    value={item.id}
                    hover>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>{item.numberComments}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{formatDate(item.timestamp)}</TableCell>
                    <TableCell>
                      {item.voteScore}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(event) => this.handleVote("upVote", item.id)} >
                        <AddCircle />
                      </IconButton>
                      <IconButton onClick={(event) => this.handleVote("downVote", item.id)}>
                        <RemoveCircle />
                      </IconButton>
                      <IconButton href={`/${item.category}/${item.id}`}>
                        <Info />
                      </IconButton>
                      <IconButton onClick={event => this.handleDeleteButton("delete", item.id)}>
                        <DeleteForever />
                      </IconButton>
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
const mapStateToProps = (myActions) => (
  {
    postList: myActions.postActions.posts,
    commentList: myActions.commentActions.replies,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    
  }
)


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostList)
);