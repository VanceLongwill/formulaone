import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import redux actions
import { selectYear, fetchRacesIfNeeded, fetchChampionsIfNeeded, invalidateYear } from '../actions';
import { getArrayOfYears } from '../helpers/helperFunctions';

import Scroll from 'react-scroll'; // Imports all Mixins

// import all components
import ScrollableContentSectionList from '../components/ScrollableContentSectionList';
import { ScrollableLinkList } from '../components/ScrollableLinkList';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { FormulaOneIcon } from '../components/FormulaOneIcon';
import { Sidebar } from '../components/Sidebar';

// CSS
import '../css/Scroll.css';
import '../css/Main.css';

const scrollSpy = Scroll.scrollSpy;
const scroll = Scroll.animateScroll;

class App extends Component {
  static propTypes = {
    selectedYear: PropTypes.number.isRequired,
    races: PropTypes.array.isRequired,
    champions: PropTypes.array.isRequired,
    selectedYearRange: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    initialFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { dispatch, selectedYear, selectedYearRange } = this.props;

    scrollSpy.update();
    // console.log('selected year');
    // console.log(selectedYear);
    dispatch(fetchChampionsIfNeeded(selectedYearRange));
    // (selectedYear);
    if (this.props.isFetching) {
      scroll.scrollToTop();
    } else {
      scroll.scrollTo(selectedYear);
    }
    scrollSpy.update();
    dispatch(fetchRacesIfNeeded(selectedYear));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedYear !== this.props.selectedYear) {
      const { dispatch, selectedYear } = nextProps;
      dispatch(fetchRacesIfNeeded(selectedYear));
    }
  }


  handleRefreshClick = (e) => {
    e.preventDefault();

    const { dispatch, selectedYear } = this.props;
    dispatch(invalidateYear(selectedYear));
    dispatch(fetchChampionsIfNeeded(selectedYear));
  }

handleChange = (nextYear) => {
  const { dispatch } = this.props;
  // console.log("IN HANDLE CHANGE")
  // console.log(nextYear);
  //
  dispatch(selectYear(nextYear));
  //  .then( () => // console.log("FINSIHED SELECT YEAR PROMISE"));
}

// / NEW render

render() {
  const { selectedYear, races, isFetching, initialFetching, lastUpdated, champions, selectedYearRange, racesByYear } = this.props;
  // const isEmpty = racesByYear[selectedYear] === 0;
  const isWaiting = champions.length === 0;

  const [firstYear, lastYear] = selectedYearRange;
  const yearsArray = getArrayOfYears(firstYear, lastYear);
  if (isWaiting) {
    return (initialFetching ? <LoadingOverlay /> : <h2>Empty.</h2>);
  }

  // let currentChamp = champions.map((champ) => {
  //   return champ.year==selectedYear ? champ.worldChampion: null
  // })[0];
  return (
    <div className="OuterContainer" /* id="OuterContainer" */>
      <FormulaOneIcon />
      <Sidebar>
        <ScrollableLinkList
          links={yearsArray}
          champions={champions}
          activeLink={selectedYear}
          onSelectLink={this.handleChange}
        />
      </Sidebar>

      <div className="InnerContainer" /* id="InnerContainer" */>

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


const mapStateToProps = (state) => {
  const { selectedYear, selectedYearRange, selectYear, racesByYear, worldChampionsByYear } = state;
  const {
    isFetching,
    lastUpdated,
    items: races,
  } = racesByYear[selectedYear] || {
    isFetching: true,
    items: [],
  };
  const {
    initialFetching,
    items: champions,
  } = worldChampionsByYear[selectedYearRange] || {
    initialFetching: true,
    items: [],
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
    lastUpdated,
  };
};

export default connect(mapStateToProps)(App);
