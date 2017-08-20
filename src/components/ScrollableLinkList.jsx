import React, { Component } from 'react';
import { ScrollableLink } from './ScrollableLink';
import { ViewPager, Frame, Track, View } from 'react-view-pager';
import { FixedHeader } from '../components/FixedHeader';
const animations = [
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
    [0, 20],
    [500, -150],
  ]
}
];

export class ScrollableLinkList extends Component{
  state = {
    activeLink: this.props.activeLink,
  }
  componentDidMount(){
    // let { activeYear } = this.props;
    // this.handleSelectLink(activeYear);
    this.handleSelectLink(this.state.activeYear);
    //this.track.scrollTo(this.props.links.indexOf(Number(link)));
  }
  handleViewChange = (link) => {
    this.setState({
      activeYear: this.props.links[link[0]],
    });
    //console.log("Set link to "+this.props.links[link[0]] );
    //this.props.onSelectLink(this.props.links[link[0]]);
  }
  handleSelectLink = (link) => {
    //this.props.onSelectLink(link);
    // this.setState({
    //   activeYear: link,
    // });
     this.track.scrollTo(this.props.links.indexOf(Number(link)));
  }
  fireProps = (link) => {
    this.props.onSelectLink(this.state.activeYear);
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
            //currentView={this.state.activeYear}
            onViewChange={this.handleViewChange}
            animations={animations}
            className="track track-y"
            onRest={this.fireProps}
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
