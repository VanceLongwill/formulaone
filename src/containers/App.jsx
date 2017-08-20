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
import {RaceList} from '../components/RaceList';
import { FixedHeader } from '../components/FixedHeader';

// CSS
import '../css/Scroll.css';
import '../css/Main.css';

let scrollSpy  = Scroll.scrollSpy;
let scroller = Scroll.scroller;
let scroll = Scroll.animateScroll;

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
  console.log('selected year');
  console.log(selectedYear);
  dispatch(fetchChampionsIfNeeded(selectedYearRange))
  scroll.scrollToTop(); //(selectedYear);
  scrollSpy.update();
  dispatch(fetchRacesIfNeeded(selectedYear))
}



  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedYear } = this.props
    dispatch(invalidateYear(selectedYear))
    dispatch(fetchChampionsIfNeeded(selectedYear))
}

handleChange = nextYear => {
  const { dispatch } = this.props

  console.log("IN HANDLE CHANGE")
  console.log(nextYear);
  this.props.dispatch(selectYear(nextYear))
  //  .then( () => console.log("FINSIHED SELECT YEAR PROMISE"));

}

/// NEW render

render() {
    const { selectedYear, races, isFetching, initialFetching, lastUpdated, champions, selectedYearRange, racesByYear } = this.props
    // // console.log("worldChampionsByYear : " + champions );
    const isEmptyOld = races.length === 0;
    const isEmpty = racesByYear[selectedYear] === 0;
    const isWaiting = champions.length === 0;

    const [ firstYear, lastYear ] = selectedYearRange;
    const yearsArray = getArrayOfYears(firstYear, lastYear);
    // console.log(champions);
    if (isWaiting){
      return (initialFetching ? <LoadingOverlay /> : <h2>Empty.</h2>);
    } else {
      console.log("INITIAL FETCHING DONE ");
      console.log(champions);
      let currentChamp = champions.map((champ) => {
        return champ.year==selectedYear ? champ.worldChampion: null
      })[0];
      return(
      <div className="OuterContainer">
        <Sidebar>
          <ScrollableLinkList links={yearsArray} champions={champions} activeLink={selectedYear} onSelectLink={this.handleChange} />
        </Sidebar>

        {/* <FixedHeader year={selectedYear} champion={champions} /> */}
        <div className="InnerContainer">

          <ScrollableContentSectionList
            selectedYear={selectedYear}
            races={races}
            racesByYear={racesByYear}
            seasons={champions}
          >
            {/* {!isFetching &&
              <button onClick={this.handleRefreshClick}>
                Refresh
              </button>
              }
              <p>
              {lastUpdated &&
                <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                </span>
              }
            </p> */}
            {/* {isEmpty
              ? <p>newest loading</p>:
              <div style={{ opacity: isFetching ? 0.5 : 1, height: '100%', width: '100%'}}>
                <RaceList races={races} />
              </div>
            } */}

          </ScrollableContentSectionList>
        </div>
      </div>
    );
    }
  }
}

///RENDER ENDER

const mapStateToProps = state => {
  const { selectedYear, selectedYearRange, selectYear, racesByYear, worldChampionsByYear } = state
  // console.log("STATE: ");
  // console.log(state);
  const {
    isFetching,
    lastUpdated,
    items: races
  } = racesByYear[selectedYear] || {
    isFetching: true,
    items: []
  }
  // // console.log("races by year");
  // // console.log(races);
  // // console.log("by YEar range");
  // // console.log(worldChampionsByYear[selectedYearRange]);
  const {
    initialFetching,
    items: champions
  } = worldChampionsByYear[selectedYearRange] || {
    initialFetching: true,
    items: []
  };//[yearRange];

  // // console.log(worldChampionsByYear);
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
