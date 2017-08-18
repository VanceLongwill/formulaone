import React, { Component } from 'react';
import { Sidebar } from './components/Sidebar';
// import { ScrollableContent } from './components/ScrollableContent';
// import {Motion, spring} from 'react-motion'; yarn remove
import Scroll from 'react-scroll'; // Imports all Mixins
import { scroller } from 'react-scroll';

import { ViewPager, Frame, Track, View } from 'react-view-pager';
import uuid from 'react-native-uuid';

import './css/Scroll.css';
import './css/Main.css';

let Link       = Scroll.Link;
let Element    = Scroll.Element;
let Events     = Scroll.Events;
let scroll     = Scroll.animateScroll;
let scrollSpy  = Scroll.scrollSpy;

// const animations = [{
//   prop: 'scale',
//   stops: [
//     [-400, 0.2],
//     [0, 1],
//     [400, 0.2],
//   ],
// }, {
//   prop: 'opacity',
//   stops: [
//     [-200, 0.8],
//     [0, 1],
//     [200, 0.8],
//   ],
// }];
const animations = [
  {
  prop: 'scale',
  stops: [
    [-450, 0.1],
    [0, 1],
    [450, 0.1],
  ],
},
// {
//   prop: 'opacity',
//   stops: [
//     [-200, 0.8],
//     [0, 1],
//     [200, 0.8],
//   ],
// },
// {
//   prop: 'backgroundColor',
//   stops: [
//     [-110, '#b4da55'],
//     [0, '#2ea8ff'],
//     [110, '#b4da55']
//   ]
// },
{
  prop: 'rotateX',
  stops: [
    [-500, -175], // rotate slides to the left
    [0, 0], // they'll be straight at center
    [500, 175] // and rotated to the right
  ],
},
// {
//   prop: 'rotateZ',
//   stops: [
//     [-500, -175], // rotate slides to the left
//     [-50, -20],
//     [0, 0], // they'll be straight at center
//     [50, 20],
//     [500, 175] // and rotated to the right
//   ]
// }
];


export default class App extends Component {
  state = {
    activeYear: 2010,
  }
  componentDidMount() {
    Events.scrollEvent.register('begin', function() {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function() {
      console.log("end", arguments);
    });

    this.track.scrollTo(2010-2005);

    scrollSpy.update();
  }

  handleSetActive = (year) => {
    console.log(year + " is the active year")
   this.track.scrollTo(year-2005);
     }

  render() {
    const years = Array.from(new Array(11), (x,i) => i + 2005);
    return (
      <div className="OuterContainer">
        <Sidebar>
          <ViewPager id="viewPager">
            <Frame id="frame" className="frame" accessibility={false}>
              <Track
                ref={
                  (c) => { this.track = c; }
                }
                viewsToShow="6"
                axis="y"
                align={0.5}
                animations={animations}
                className="track track-y"
              >
                {
                  years.map((year) =>{
                      let yearAsString = ""+year;
                    // let isActiveYear = (year === this.state.activeYear);
                    // if (isActiveYear) {
                    //   console.log(`${yearAsString} is the active year`);
                    // }
                    // let activeClass = (year==this.state.activeYear) ? "active": "notactive";
                    return (
                      <View className="view" key={year}>
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
                      </View>
                    );
                  })
                }

              </Track>
            </Frame>
          </ViewPager>
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
