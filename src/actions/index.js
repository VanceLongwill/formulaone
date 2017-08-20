// Global app constant
import {FIRST_DOCUMENTED_YEAR} from '../config';

import { handleErrors } from '../helpers/helperFunctions';

export const REQUEST_RACES = 'REQUEST_RACES'
export const RECEIVE_RACES = 'RECEIVE_RACES'
export const INVALIDATE_RACES ='INVALIDATE_RACES'

export const SELECT_YEAR = 'SELECT_YEAR'
export const INVALIDATE_YEAR = 'INVALIDATE_YEAR'

export const REQUEST_CHAMPIONS = 'REQUEST_CHAMPIONS'
export const RECEIVE_CHAMPIONS = 'RECEIVE_CHAMPIONS'
export const INVALIDATE_CHAMPIONS = 'INVALIDATE_CHAMPIONS'

export const SELECTED_YEAR_RANGE = 'SELECTED_YEAR_RANGE'

export const requestChampions = yearRange => ({
  type: REQUEST_CHAMPIONS,
  yearRange
})

export const receiveChampions = (yearRange, json) => ({
  type: RECEIVE_CHAMPIONS,
  yearRange,
  champions: json,
})

export const invalidateChampions = yearRange => ({
  type: INVALIDATE_CHAMPIONS,
  yearRange,
  receivedAt: Date.now()
})

export const invalidateRaces = year => ({
  type: INVALIDATE_RACES,
  year,
  receivedAt: Date.now()
})

export const selectedYearRange = yearRange => ({
  type: SELECTED_YEAR_RANGE,
  yearRange
})


export const selectYear = year => ({
  type: SELECT_YEAR,
  year
})

export const invalidateYear = year => ({
  type: INVALIDATE_YEAR,
  year
})

export const requestRaces = year => ({
  type: REQUEST_RACES,
  year
})

export const receiveRaces = (year, json) => ({
  type: RECEIVE_RACES,
  year,
  races: json, //.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchRaces = year => dispatch => {
  dispatch(requestRaces(year))

  let url = `http://ergast.com/api/f1/${year}/results/1.json`
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      let {
        MRData: {
          RaceTable: {
            Races: raceDataRaw
          }
        }
      } = data;

      let raceData = raceDataRaw.map(race => {

          let {
            raceName: nameOfRace,
            Results: [{
              Driver: {
                familyName,
                givenName,
                url,
              }
            }]
          } = race;

          return {
            name: nameOfRace,
            winner: `${givenName} ${familyName}`,
            wikiLink: url,
          }

      });
      // console.log(raceData);
      dispatch(receiveRaces(year, raceData));
    })
}

const fetchChampions = yearRange => dispatch => {
  dispatch(requestChampions(yearRange))
  const ROOT_URL = "http://ergast.com/api/f1/";
  const RESPONSE_FORMAT = ".json";
  let [startYear, endYear] = yearRange;
  let yearsToFetch = endYear - startYear;
  let limit = yearsToFetch + 1;
  // let thisYear = 2015; // new Date().getFullYear(); can be used to get 10 previous seasons' results with different args options (e.g. just passing a single year auto fetches all years since that year)
  let yearOffset = endYear - FIRST_DOCUMENTED_YEAR - yearsToFetch;
  var url = `${ROOT_URL}driverStandings/1${RESPONSE_FORMAT}?offset=${yearOffset}&limit=${limit}`;
  // console.log("url :  "+ url);
  return fetch(url)
    .then(handleErrors)
    .then(res => res.json())
    .then(data => {
        let {
           MRData: {
             StandingsTable: {
               StandingsLists: arrayOfData
             }
         }
       } = data;

       let arrayOfChampions = arrayOfData.map((champ) =>{

          let {
             season: seasonYear,
             DriverStandings: [
            {
              Driver: {
                givenName: firstName,
                familyName: lastName,
              }
            }
             ]
          } = champ;

          return ({
            year: seasonYear,
            worldChampion: `${firstName} ${lastName}`,
          });

       })
       // console.log("RESPONSE : " );
       // console.log(arrayOfChampions);
       dispatch(receiveChampions(yearRange, arrayOfChampions));
    })
    .catch(console.log)
}
const shouldFetchChampions = (state, yearRange) => {
  // ADD: Check localStorage for cached copy **
  //
  const champions = state.worldChampionsByYear[yearRange];
  // console.log(`IN SHOULD FETCH CHAMPIONS::    ${champions}`)
  if (!champions){
    return true
  }
  if (champions.initialFetching){
    return false
  }
  return champions.didInvalidate
  //const champions = state.championsByYear[]
}

const shouldFetchRaces = (state, year) => {
  const races = state.racesByYear[year]
  if (!races) {
    return true
  }
  if (races.isFetching) {
    return false
  }
  return races.didInvalidate
}

export const fetchRacesIfNeeded = year => (dispatch, getState) => {
  if (shouldFetchRaces(getState(), year)) {
    return dispatch(fetchRaces(year))
  }
}

export const fetchChampionsIfNeeded = yearRange => (dispatch, getState) => {
  if (shouldFetchChampions(getState(), yearRange)){
    return dispatch(fetchChampions(yearRange))
  }

}
