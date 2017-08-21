import React from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';
import '../css/ScrollableContentSection.css';

export const ScrollableContentSection = ({ year, champion, content, lastUpdated }) => (
  <Scroll.Element name={`${year}`} className="element">
    <div className="linkSection">
      <div className="sectionHeader">
        <b>
          {`${year}`}
        </b>
        <b> World Champion: {champion} </b>
      </div>
      {
        lastUpdated ?
          <p className="lastUpdated"><span>Updated: </span>{lastUpdated}</p>
          : null
      }
      <Scroll.Element className="sectionContent element" name={`${year}_content`}>
        {content}
      </Scroll.Element>


    </div>
  </Scroll.Element>
);


// Add prop-types declaration
