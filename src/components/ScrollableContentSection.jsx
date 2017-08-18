import React from 'react';
import Scroll from 'react-scroll';

export const ScrollableContentSection = ({name, content}) => (
    <Scroll.Element name={`${name}`} className="element" >
      <b>
        {`${name}`}
      </b>
      <p>
        {content}
      </p>
    </Scroll.Element>
)
