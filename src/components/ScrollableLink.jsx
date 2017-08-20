import React from 'react';
import Scroll from 'react-scroll';

export const ScrollableLink = ({name , onSetActive}) => (
  // <View className="view" key={props.name}>
    <Scroll.Link
      activeClass="active"
      className="menu-item"
      name={`${name}`}
      id={`${name}`}
      to={`${name}`}
      spy={true}
      smooth={true}
      duration={500}
      offset={0}
      onSetActive={onSetActive}
      //containerId={'ScrollableContainer'}
    >
      {`${name}`}
    </Scroll.Link>
  // </View>
);
