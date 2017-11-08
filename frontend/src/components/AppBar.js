import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Menu from 'material-ui/Menu';
import { MenuItem } from 'material-ui/Menu'
import MenuIcon from 'material-ui-icons/Menu';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
});

class SimpleAppBar extends Component {
  
  state = {
    anchorEl: null,
    open: false
  };
  
  handleClick = (event, category) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };
  
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  
  render() {
    return (
      <div >
        <AppBar position="static" color="default">
          <Toolbar>
          <Button
            aria-owns={this.state.open ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onRequestClose={event => this.handleRequestClose()}
            PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: 200,
            },
          }}
          >
            <MenuItem
              key="all"
              component={Link}
              to="/"
              onClick={event => this.handleRequestClose()}
            >
              All
            </MenuItem>
            {this.props.categories.map(category => (
              <MenuItem 
                key={category} 
                component={Link}
                to={"/"+category}
                onClick={event => this.handleRequestClose()}
              >
                {category}
              </MenuItem>
            ))}
            
          </Menu>
            
            <Typography type="title" color="inherit">
              {this.props.title}
            </Typography>

          </Toolbar>
        </AppBar>
      </div>
    );
  };
};

SimpleAppBar.propTypes = {
  title: PropTypes.string,
  categories: PropTypes.array,
};

export default withStyles(styles)(SimpleAppBar);
