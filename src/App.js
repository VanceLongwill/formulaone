import React, { Component } from 'react';

import Scroll from 'react-scroll'; // Imports all Mixins

import { Sidebar } from './components/Sidebar';
import { ScrollableContentSection } from './components/ScrollableContentSection';
import { fetchYear } from './helpers/fetchYear';
import { ScrollableLinkList } from './components/ScrollableLinkList';

import './css/Scroll.css';
import './css/Main.css';

let scrollSpy  = Scroll.scrollSpy;

export default class App extends Component {
  state = {
    activeYear: 2010,
    yearRange: [2005, 2015],
    races: [

    ],
  }
  getArrayOfYears = () => {
    let { yearRange } = this.state;
    return Array.from(new Array(yearRange[1]-yearRange[0]+1), (x,i) => i + 2005);
  }
  componentDidMount() {

    scrollSpy.update();

    const dataByYear = new fetchYear(2010);
     dataByYear.data.then( data => this.setState({
       races: data.MRData.RaceTable.Races,
     }));

  }

  render() {
    const years = this.getArrayOfYears();
    return (
      <div className="OuterContainer">
        <Sidebar>
          <ScrollableLinkList links={years} />
        </Sidebar>
        <div className="InnerContainer">
          {
            years.map((year) =>{
              return (
                <ScrollableContentSection
                  key={`_${year}`}
                  name={year}
                  content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}
