import React, { Component } from 'react';
import { push as Menu } from 'react-burger-menu';
import '../css/Sidebar.css';

export class Sidebar extends Component {
  // Add state + open and close menu functionality
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    const defaultStyles = {
      bmMenu: {
        overflow: 'none',
      }
    }
    return (
      <Menu
        noOverlay
        pageWrapId={'InnerContainer'}
        outerContainerId={'OuterContainer'}
        width={'20%'}
        isOpen={true}
        customCrossIcon={false}
        customBurgerIcon={false}
        styles={Object.assign({}, defaultStyles, this.props.styles)} // ES6 Object.assign for Immutability & to preserve the order of the css styles
      >
        { this.props.children }
      </Menu>
        );
  }
}
