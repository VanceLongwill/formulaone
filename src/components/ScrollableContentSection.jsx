import React from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';

export const ScrollableContentSection = ({name, champion, content}) => (
    <Scroll.Element name={`${name}`} className="element" >
      <b>
        {`${name}`}
      </b>
      <b> World Champion: {champion} </b>
      <p>
        {content}
      </p>
    </Scroll.Element>
)


// Add prop-types declaration
