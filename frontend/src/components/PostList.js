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
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import DateRange from 'material-ui-icons/DateRange';
import TrendingUp from 'material-ui-icons/TrendingUp';
import Info from 'material-ui-icons/Info';
import { formatDate } from '../utils/formatDate';


class PostList extends Component {

  state = {
    orderBy: '',
    order: 'asc',
  }

  componentWillReceiveProps() {

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

  sortBy = (field) => {
    const orderBy = field;
    let order = 'desc';

    if (this.state.orderBy === orderBy && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({
      orderBy,
      order
    });

  }

  cancelSort = () => {
    this.setState({
      orderBy: ''
    })
  }
  

  render() {
    console.log('render PostList')
    const filterCategory = this.props.match.params.category ? this.props.match.params.category : "All";
    const posts = 
    this.state.order === 'desc'
    ? this.props.postList.filter(_ => _.category === filterCategory || filterCategory === 'All').sort((a, b) => (b[this.state.orderBy] < a[this.state.orderBy] ? 1 : -1))
    : this.props.postList.filter(_ => _.category === filterCategory || filterCategory === 'All').sort((a, b) => (a[this.state.orderBy] < b[this.state.orderBy] ? 1 : -1));
    
    return(
      <div>

        <div>
          <Button fab color="primary" aria-label="add" component={Link} to={'/create'}>
            <AddIcon />
          </Button>
        </div> 

        <div>
          <p>
            We have {posts.length ? posts.length : 0} posts in the category: {filterCategory}
          </p>
          {this.state.orderBy !== ''
            ? <Button onClick={this.cancelSort}>Cancel Sort</Button>
            : ""
          }
          
        </div>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell># of Comments</TableCell>
                <TableCell>Category</TableCell>
                <TableCell onClick={() => this.sortBy('timestamp')}>
                  {this.state.orderBy === 'timestamp' && this.state.orderBy !== ""
                    ? this.state.order === 'asc' ? <ArrowDropUp /> : <ArrowDropDown/>
                    : ""
                  }
                  <DateRange/>
                </TableCell>
                <TableCell onClick={() => this.sortBy('voteScore')}>
                  {this.state.orderBy === 'voteScore' && this.state.orderBy !== ""
                    ? this.state.order === 'asc' ? <ArrowDropUp /> : <ArrowDropDown/>
                    : "" }
                  <TrendingUp/>
                </TableCell>
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
    categoryList: myActions.categoryActions.categories,
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