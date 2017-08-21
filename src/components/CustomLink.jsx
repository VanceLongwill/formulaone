import Scroll from 'react-scroll';
import React, { Component } from 'react';

const Helpers = Scroll.Helpers;
const defaultScroller = Scroll.scroller;
const events = Scroll.Events;
const animateScroll = Scroll.animateScroll;


// Custom scroll component to add support for ignoring offset when scrolling to an element
// added prop ignoreOffsetOnScroll
// When ignoreOffsetOnScroll is toggled true, it will to the element's normal position
// I plan to submit a pull request for 'react-scroll' to add this prop as I think it's really useful
// For now, it shows an error about prop types, which I have not yet updated to include the new prop

const CustomLinkClass = ({ props, children }) => (
  <a {...props} className="menu-item">
    {children}
  </a>
);


const customScroller = Object.assign({}, defaultScroller, {
  scrollTo(to, inheritProps) {
    /*
     * get the mapped DOM element
     */

    const target = this.get(to);

    if (!target) {
      // console.warn('target Element not found');
      return;
    }

    const props = Object.assign({}, inheritProps, { absolute: false });


    if (events.registered.begin) {
      events.registered.begin(to, target);
    }

    const containerId = props.containerId;
    const container = props.container;

    let containerElement;

    if (containerId) {
      containerElement = document.getElementById(containerId);
    } else if (container && container.nodeType) {
      containerElement = container;
    } else {
      containerElement = null;
    }

    let scrollOffset;

    if ((containerId || container) && containerElement) {
      props.absolute = true;
      if (containerElement !== target.offsetParent) {
        if (!containerElement.contains(target)) {
          throw new Error(`Container with ID ${containerId || container} is not a parent of target ${to}`);
        } else {
          throw new Error(`Container with ID ${containerId || container} is not a positioned element`);
        }
      }

      scrollOffset = target.offsetTop;
    } else {
      const coordinates = target.getBoundingClientRect();
      scrollOffset = coordinates.top;
    }

    // Ignore offset -- added by Vance
    if (!props.ignoreOffsetOnScroll) {
      scrollOffset += (props.offset || 0);
    }


    /*
       * if animate is not provided just scroll into the view
       */
    if (!props.smooth) {
      if ((containerId || container) && containerElement) {
        containerElement.scrollTop = scrollOffset;
      } else {
        // window.scrollTo accepts only absolute values so body rectangle needs to be subtracted
        const bodyRect = document.body.getBoundingClientRect();
        window.scrollTo(0, scrollOffset - bodyRect.top);
      }

      if (events.registered.end) {
        events.registered.end(to, target);
      }

      return;
    }

    /*
       * Animate scrolling
       */

    animateScroll.animateTopScroll(scrollOffset, props, to, target);
  },
});

export const CustomLink = Helpers.Scroll(CustomLinkClass, customScroller);
