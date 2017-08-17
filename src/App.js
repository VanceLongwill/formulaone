import React, { Component } from 'react';
import { Sidebar } from './components/Sidebar';
// import { ScrollableContent } from './components/ScrollableContent';
import {Motion, spring} from 'react-motion';
import Scroll from 'react-scroll'; // Imports all Mixins
import { scroller } from 'react-scroll';

import './css/Scroll.css';
import './css/Main.css';

let Link       = Scroll.Link;
let Element    = Scroll.Element;
let Events     = Scroll.Events;
let scroll     = Scroll.animateScroll;
let scrollSpy  = Scroll.scrollSpy;

export default class App extends Component {
  state = {
    activeYear: '2005',
    animateNow: false,
  }
  componentDidMount() {

    Events.scrollEvent.register('begin', function() {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function() {
      console.log("end", arguments);
    });

    scrollSpy.update();
  }

  handleSetActive = (year) => {
    this.setState({
      activeYear: year,
      animateNow: true,
     });
  }

  render() {
    const years = Array.from(new Array(11), (x,i) => i + 2005);
    return (
      <div className="OuterContainer">
        <Sidebar>

          {
            years.map((year) =>{
              let yearAsString = ""+year;
              // let isActiveYear = (year === this.state.activeYear);
              // if (isActiveYear) {
              //   console.log(`${yearAsString} is the active year`);
              // }

              return (


                <Link
                  activeClass="active"
                  className="menu-item"
                  name={yearAsString}
                  id={yearAsString}
                  to={yearAsString}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-50}
                  onSetActive={this.handleSetActive}
                  //containerId={'ScrollableContainer'}
                  
                >
                  {yearAsString}
                </Link>



              );
            })
          }
        </Sidebar>
        <div className="InnerContainer">
          {
            years.map((year) =>{
              let yearAsString = ""+year;
              return (
                <Element name={yearAsString} className="element" >
                  <b>
                    {yearAsString}
                  </b>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </Element>
              );
            })
          }
        </div>
      </div>
    );
  }
}
