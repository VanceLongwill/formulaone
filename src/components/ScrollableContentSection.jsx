import React from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';
import {FixedHeader} from '../components/FixedHeader';

import '../css/ScrollableContentSection.css';

export const ScrollableContentSection = ({year, champion, content}) => (
    <Scroll.Element name={`${year}`} className="element" >
      <div className="linkSection">
        <div className="sectionHeader">
          <b>
            {`${year}`}
          </b>
          <b> World Champion: {champion} </b>
        </div>
        <div className="sectionContent">
          {content}
        </div>

      </div>
    </Scroll.Element>
)


// Add prop-types declaration
