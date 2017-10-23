import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
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
  
  handleRequestClose = (event, category) => {
    if (category) {
      window.location = category;
    }
    
    this.setState({
      open: false,
    });
    console.log(category);
    
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
            onRequestClose={event => this.handleRequestClose(event, null)}
            PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: 200,
            },
          }}
          >
            {this.props.categories.map(category => (
              <MenuItem key={category} onClick={event => this.handleRequestClose(event, category)}>{category}</MenuItem>
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
