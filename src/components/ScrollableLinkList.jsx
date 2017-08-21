import React, { Component } from 'react';
import { ViewPager, Frame, Track, View } from 'react-view-pager';
import ScrollableLink from './ScrollableLink';

import Scroll from 'react-scroll';
const scroll = Scroll.animateScroll;

/*
        Define animation stops for react-view-pager
        renders to a wheel-like carousel animation

 */
const animations = [
  {
    prop: 'opacity',
    stops: [
      [-300, 0.0],
      [-200, 0.8],
      [0, 1],
      [200, 0.8],
      [300, 0.0],
    ],
  },
  {
    prop: 'rotateX',
    stops: [
      [-500, -120], // rotate slides to the left
      [0, 0], // they'll be straight at center
      [500, 120], // and rotated to the right
    ],
  },
  {
    prop: 'translateZ',
    stops: [
      [-500, -150],
      [0, 20],
      [500, -150],
    ],
  },
];

export default class ScrollableLinkList extends Component {
  state = {
    activeLink: this.props.activeLink,
  }
  componentDidMount() {
    let { activeLink } = this.state;
    this.handleSelectLink(activeLink);
  }
  handleViewChange = (link) => {
    this.setState({
      activeLink: this.props.links[link[0]],
    });
  }
  handleSelectLink = (link) => {
    if (link !== undefined) {
      this.setState({
        activeLink: link,
      });
      this.track.scrollTo(this.props.links.indexOf(Number(link)));
    }
  }

  // Fires props after animation settles
  fireProps = () => {
    if (this.state.activeLink !== undefined) {
      this.props.onSelectLink(this.state.activeLink);
    }
  }
  render() {
    return (
      <ViewPager id="viewPager">
        <Frame id="frame" className="frame" accessibility={false}>
          <Track
            ref={
              (c) => { this.track = c; }
            }
            viewsToShow={10}
            axis="y"
            align={0.5}
            // currentView={this.state.activeLink}
            onViewChange={this.handleViewChange}
            animations={animations}
            className="track track-y"
            onRest={this.fireProps}
          >
            {
              /*
              Maps the array of link names given as props to react-view-pager views,
              each with a link component inside.
              The carousel component is formed using react-scroll Link elements,
              inside react-view-pager views,
              which are connected to react-scroll Elements - i.e. the selected content.
              */
              this.props.links.map(link => (
                <View className="view" key={link}>
                  <ScrollableLink name={link} onSetActive={this.handleSelectLink} />
                </View>
              ))
            }
          </Track>
        </Frame>
      </ViewPager>
    );
  }
}
