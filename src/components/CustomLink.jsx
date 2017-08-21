import Scroll from 'react-scroll';
import React, {Component} from 'react';
let Helpers = Scroll.Helpers;
let defaultScroller = Scroll.scroller;
let events = Scroll.Events;
let animateScroll = Scroll.animateScroll;


// Custom scroll component to add support for ignoring offset when scrolling to an element
// added prop ignoreOffsetOnScroll
// When ignoreOffsetOnScroll is toggled true, it will to the element's normal position
// I plan to submit a pull request for 'react-scroll' to add this prop as I think it's really useful
// For now, it shows an error about prop types, which I have not yet updated to include the new prop

class CustomLinkClass extends Component {
  render(){
    return(
      <a {...this.props}>
        {this.props.children}
      </a>
    )
  }
}


const customScroller = Object.assign({}, defaultScroller, {
  scrollTo: function(to, props) {

     /*
     * get the mapped DOM element
     */

      var target = this.get(to);

      if(!target) {
        console.warn("target Element not found");
        return;
      }

      props = Object.assign({}, props, { absolute : false });


      if(events.registered['begin']) {
        events.registered['begin'](to, target);
      }

      var containerId = props.containerId;
      var container = props.container;

      var containerElement;

      if(containerId) {
        containerElement = document.getElementById(containerId);
      } else if(container && container.nodeType) {
        containerElement = container;
      } else {
        containerElement = null;
      }

      var scrollOffset;

      if((containerId || container) && containerElement) {
        props.absolute = true;
        if(containerElement !== target.offsetParent) {
          if(!containerElement.contains(target)) {
            throw new Error('Container with ID ' + (containerId  || container) + ' is not a parent of target ' + to);
          } else {
            throw new Error('Container with ID ' + (containerId  || container)  + ' is not a positioned element');
          }
        }

        scrollOffset = target.offsetTop;
      } else {
        var coordinates = target.getBoundingClientRect();
        scrollOffset = coordinates.top;
      }

      // Ignore offset -- added by Vance
      if (!props.ignoreOffsetOnScroll){
        scrollOffset += (props.offset || 0);
      }


      /*
       * if animate is not provided just scroll into the view
       */
      if(!props.smooth) {
        if((containerId  || container) && containerElement) {
          containerElement.scrollTop = scrollOffset;
        } else {
          // window.scrollTo accepts only absolute values so body rectangle needs to be subtracted
          var bodyRect = document.body.getBoundingClientRect();
          window.scrollTo(0, scrollOffset - bodyRect.top);
        }

        if(events.registered['end']) {
          events.registered['end'](to, target);
        }

        return;
      }

      /*
       * Animate scrolling
       */

      animateScroll.animateTopScroll(scrollOffset, props, to, target);
  }

});

export const CustomLink = Helpers.Scroll(CustomLinkClass, customScroller);
