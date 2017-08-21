import React, { Component } from 'react';
// import Scroll from 'react-scroll';
import CustomLink from './CustomLink';

// let scroller = Scroll.animateScroll;

const ScrollableLink = ({ name, onSetActive }) => (
  <CustomLink
    activeClass="active"
    className="menu-item"
    to={`${name}`}
    name={`${name}`}
    id={`${name}`}
    spy
    smooth
    duration={500}
    offset={-300}
    // Custom prop ignoreOffsetOnScroll
    ignoreOffsetOnScroll
    onSetActive={onSetActive}
  >
    {`${name}`}
  </CustomLink>
);

export default ScrollableLink;
