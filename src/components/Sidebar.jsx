import React, { Component } from 'react';
import { push as Menu } from 'react-burger-menu';
import {Motion, spring} from 'react-motion';
import '../css/Sidebar.css';

export class Sidebar extends Component {

  showSettings(event) {
    event.preventDefault();
  }

  render() {
    const styles = {
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
        styles={styles}
      >
        { this.props.children }
      </Menu>
        );
  }
}
