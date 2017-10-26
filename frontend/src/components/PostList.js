import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';
import AddCircle from 'material-ui-icons/AddCircle';
import RemoveCircle from 'material-ui-icons/RemoveCircle';
import DeleteForever from 'material-ui-icons/DeleteForever';
import Info from 'material-ui-icons/Info';
import Edit from 'material-ui-icons/Edit';


class PostList extends Component {
  
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
    const filterCategory = this.props.match.params.category ? this.props.match.params.category : "All";

    console.log("filterCategory = ", filterCategory);

    const posts = this.props.postList.filter(_ => _.category === filterCategory || filterCategory === 'All');
    
    return(
      <div>

        <div>
          <Button fab color="primary" aria-label="add" onClick={this.props.openModal}>
            <AddIcon />
          </Button>
        </div> 

        <p>We have {posts.length ? posts.length : 0} posts in the category: {filterCategory}</p>

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
                    hover>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>{this.formatDate(item.timestamp)}</TableCell>
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
                      <IconButton onClick={() => this.props.openModal(item.id)} >
                        <Edit />
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


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostList)
);