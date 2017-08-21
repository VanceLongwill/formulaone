import React, { Component } from 'react';
import { push as Menu } from 'react-burger-menu';
import '../css/Sidebar.css';

const defaultStyles = {
  bmMenu: {
    overflow: 'none',
  },
};

const Sidebar = ({ styles, children }) => (
  <Menu
    noOverlay
    pageWrapId={'InnerContainer'}
    outerContainerId={'OuterContainer'}
    width={'20%'}
    isOpen
    customCrossIcon={false}
    customBurgerIcon={false}
    styles={
      Object.assign({}, defaultStyles, styles)
    } // ES6 Object.assign for Immutability & to preserve the order of the css styles
  >
    { children }
  </Menu>
);

export default Sidebar;
