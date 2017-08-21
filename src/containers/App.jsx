import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// import redux actions
import { selectYear, fetchRacesIfNeeded, fetchChampionsIfNeeded, invalidateYear } from '../actions'
import { getArrayOfYears } from '../helpers/helperFunctions';

import Scroll from 'react-scroll'; // Imports all Mixins

// import all components
import { Sidebar } from '../components/Sidebar';
import { ScrollableContentSectionList } from '../components/ScrollableContentSectionList';
import { ScrollableLinkList } from '../components/ScrollableLinkList';
import { LoadingOverlay } from '../components/LoadingOverlay';

import { FormulaOneIcon } from '../components/FormulaOneIcon';
// CSS
import '../css/Scroll.css';
import '../css/Main.css';

let scrollSpy  = Scroll.scrollSpy;
let scroll = Scroll.animateScroll;
// Or Access Link,Element,etc as follows
let Link       = Scroll.Link;
let Element    = Scroll.Element;
let Events     = Scroll.Events;


class App extends Component {
  static propTypes = {
    selectedYear: PropTypes.number.isRequired,
    races: PropTypes.array.isRequired,
    champions: PropTypes.array.isRequired,
    selectedYearRange: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    initialFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedYear !== this.props.selectedYear) {
      const { dispatch, selectedYear } = nextProps
      dispatch(fetchRacesIfNeeded(selectedYear))
    }
  }


componentDidMount() {
  const { dispatch, selectedYear, selectedYearRange } = this.props
  Events.scrollEvent.register('begin', function(to, element) {
  console.log("begin", arguments);

});


Events.scrollEvent.register('end', function(to, element) {
  console.log("end", arguments);

});

scrollSpy.update();
  // console.log('selected year');
  // console.log(selectedYear);
  dispatch(fetchChampionsIfNeeded(selectedYearRange))
   //(selectedYear);
   if (this.props.isFetching) {
     scroll.scrollToTop();
   } else {
     scroll.scrollTo(selectedYear);
   }
  scrollSpy.update();
  dispatch(fetchRacesIfNeeded(selectedYear))
}

componentWillUnmount() {
  // Removes scroll event listeners when components unmounts
  Events.scrollEvent.remove('begin');
  Events.scrollEvent.remove('end');
}


  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedYear } = this.props
    dispatch(invalidateYear(selectedYear))
    dispatch(fetchChampionsIfNeeded(selectedYear))
}

handleChange = nextYear => {
  const { dispatch } = this.props;
  // console.log("IN HANDLE CHANGE")
  // console.log(nextYear);
  //
  dispatch(selectYear(nextYear))
  //  .then( () => // console.log("FINSIHED SELECT YEAR PROMISE"));

}

/// NEW render

render() {
    const { selectedYear, races, isFetching, initialFetching, lastUpdated, champions, selectedYearRange, racesByYear } = this.props
    // const isEmpty = racesByYear[selectedYear] === 0;
    const isWaiting = champions.length === 0;

    const [ firstYear, lastYear ] = selectedYearRange;
    const yearsArray = getArrayOfYears(firstYear, lastYear);
    if (isWaiting){
      return (initialFetching ? <LoadingOverlay /> : <h2>Empty.</h2>);
    } else {

      // let currentChamp = champions.map((champ) => {
      //   return champ.year==selectedYear ? champ.worldChampion: null
      // })[0];
      return(
      <div className="OuterContainer" >
        <Sidebar>
          <FormulaOneIcon />
          <ScrollableLinkList
            links={yearsArray}
            champions={champions}
            activeLink={selectedYear}
            onSelectLink={this.handleChange}
          />
        </Sidebar>

        <div className="InnerContainer" >

          <ScrollableContentSectionList
            isFetching={isFetching}
            selectedYear={selectedYear}
            races={races}
            racesByYear={racesByYear}
            seasons={champions}
          />
        </div>
      </div>
    );
    }
  }
}

///RENDER ENDER

const mapStateToProps = state => {
  const { selectedYear, selectedYearRange, selectYear, racesByYear, worldChampionsByYear } = state
  const {
    isFetching,
    lastUpdated,
    items: races
  } = racesByYear[selectedYear] || {
    isFetching: true,
    items: []
  }
  const {
    initialFetching,
    items: champions
  } = worldChampionsByYear[selectedYearRange] || {
    initialFetching: true,
    items: []
  };

  return {
    selectYear,
    selectedYear,
    races,
    isFetching,
    worldChampionsByYear,
    racesByYear,
    initialFetching,
    selectedYearRange,
    champions,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App);
