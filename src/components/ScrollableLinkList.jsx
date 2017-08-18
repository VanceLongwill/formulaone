import React, { Component } from 'react';
import { ScrollableLink } from './ScrollableLink';
import { ViewPager, Frame, Track, View } from 'react-view-pager';


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
// {
//   prop: 'scale',
//   stops: [
//     [-500, 0.6],
//     [0, 1],
//     [500, 0.6],
//   ],
// },
{
  prop: 'opacity',
  stops: [
    [-300, 0.0],
    [-200, 0.8],
    [0, 1],
    [200, 0.8],
    [300, 0.0]
  ],
},
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
    [-500, -120], // rotate slides to the left
    [0, 0], // they'll be straight at center
    [500, 120] // and rotated to the right
  ],
},
{
  prop: 'translateZ',
  stops: [
    [-500, -150],
    // [-300, -36], // rotate slides to the left
    [0, 20], // they'll be straight at center
    // [300, 36], // and rotated to the right
    [500, -150],
  ]
}
];

export class ScrollableLinkList extends Component{

  handleSelectLink = (link) => {
     this.track.scrollTo(this.props.links.indexOf(Number(link)));
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
            animations={animations}
            className="track track-y"
          >
            {
              this.props.links.map((link) =>{
                return (
                  <View className="view" key={link}>
                    <ScrollableLink name={link} onSetActive={this.handleSelectLink}/>
                  </View>
                );
              })
            }
          </Track>
        </Frame>
      </ViewPager>
    );
  }
}
