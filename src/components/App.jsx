import React, { Component } from 'react';

import Scroll from 'react-scroll'; // Imports all Mixins

import { Sidebar } from './Sidebar';
import { ScrollableContentSection } from './ScrollableContentSection';
import { fetchYear } from '../helpers/fetchYear';
import { ScrollableLinkList } from './ScrollableLinkList';

// // GraphQL syntax to query the JSON object returned by the api (Note: sSupport from the API server not necessary)
// import gql from 'graphql-tag'; !!!!  yarn remove
// import graphql from 'graphql-anywhere';  !!! yarn remove

import NetworkService from '../helpers/NetworkService';

import '../css/Scroll.css';
import '../css/Main.css';

let scrollSpy  = Scroll.scrollSpy;

export default class App extends Component {
  state = {
    activeYear: 2010,
    yearRange: [2005, 2015],
    races: [

    ],
    champData: [],
    // winners: this.getWinners(),
  }

  populateEmptySeasonsData = () => {
    return this.getArrayOfYears().map((year) => {
      return Object.assign({}, {
        season: year.toString(),
          DriverStandings: [
          {
            Driver: {
              givenName: "",
              familyName: "",
            }
          }
          ]
      });
    })
  }
  getArrayOfYears = () => {
    let { yearRange } = this.state;
    return Array.from(new Array(yearRange[1]-yearRange[0]+1), (x,i) => i + 2005);
  }

  fetchWinners = () => {
    NetworkService.getWinners()
      .then(data => {
        // console.log('Winners:', data)
        // this.setState({
        //   winners: data
        // });
        this.queryWinners(data);

      });
  }

  queryWinners = (data) => {

      let {
         MRData: {
           StandingsTable: {
             StandingsLists: champArray
           }
       }
     } = data;

     this.setState({
       champData: champArray,
     });

  }


  getDataForYears = () => {
    NetworkService.getYear()
    .then(data => {
      console.log('Data:', data)
      this.setState({
        races: data.MRData.RaceTable.Races
      });
    })
  }
  componentWillMount() {

    let initialSeasonsData = this.populateEmptySeasonsData();
    this.setState({champData: initialSeasonsData});
  }
  componentDidMount() {
    this.fetchWinners();
    scrollSpy.update();


    // const dataByYear = new raceData(this.state.yearRange);
    //  dataByYear.data.then( data => this.setState({
    //    races: data.MRData.RaceTable.Races,
    //  }));
    //  let dataFromPromise = await dataByYear.data();
    //  console.log('NEW\n' +dataFromPromise)
  }


  getChamps = (champArray) => {

    champArray.map((champ) => {
      let {
         season: sezon,
         DriverStandings: [
        {
          Driver: {
            givenName: firstName,
            familyName: lastName,
          }
        }
         ]
      } = champ;
      // console.log(sezon, firstName, lastName);
      //
      console.log(sezon)
    });
  }

  render() {
    let { champData } = this.state;

     //
    //  let champData = [
    //             {
    //                 "season": "2005",
    //                 "round": "19",
    //                 "DriverStandings": [
    //                     {
    //                         "position": "1",
    //                         "positionText": "1",
    //                         "points": "133",
    //                         "wins": "7",
    //                         "Driver": {
    //                             "driverId": "alonso",
    //                             "permanentNumber": "14",
    //                             "code": "ALO",
    //                             "url": "http://en.wikipedia.org/wiki/Fernando_Alonso",
    //                             "givenName": "Fernando",
    //                             "familyName": "Alonso",
    //                             "dateOfBirth": "1981-07-29",
    //                             "nationality": "Spanish"
    //                         },
    //                         "Constructors": [
    //                             {
    //                                 "constructorId": "renault",
    //                                 "url": "http://en.wikipedia.org/wiki/Renault_F1",
    //                                 "name": "Renault",
    //                                 "nationality": "French"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 "season": "2006",
    //                 "round": "18",
    //                 "DriverStandings": [
    //                     {
    //                         "position": "1",
    //                         "positionText": "1",
    //                         "points": "134",
    //                         "wins": "7",
    //                         "Driver": {
    //                             "driverId": "alonso",
    //                             "permanentNumber": "14",
    //                             "code": "ALO",
    //                             "url": "http://en.wikipedia.org/wiki/Fernando_Alonso",
    //                             "givenName": "Fernando",
    //                             "familyName": "Alonso",
    //                             "dateOfBirth": "1981-07-29",
    //                             "nationality": "Spanish"
    //                         },
    //                         "Constructors": [
    //                             {
    //                                 "constructorId": "renault",
    //                                 "url": "http://en.wikipedia.org/wiki/Renault_F1",
    //                                 "name": "Renault",
    //                                 "nationality": "French"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 "season": "2007",
    //                 "round": "17",
    //                 "DriverStandings": [
    //                     {
    //                         "position": "1",
    //                         "positionText": "1",
    //                         "points": "110",
    //                         "wins": "6",
    //                         "Driver": {
    //                             "driverId": "raikkonen",
    //                             "permanentNumber": "7",
    //                             "code": "RAI",
    //                             "url": "http://en.wikipedia.org/wiki/Kimi_R%C3%A4ikk%C3%B6nen",
    //                             "givenName": "Kimi",
    //                             "familyName": "Räikkönen",
    //                             "dateOfBirth": "1979-10-17",
    //                             "nationality": "Finnish"
    //                         },
    //                         "Constructors": [
    //                             {
    //                                 "constructorId": "ferrari",
    //                                 "url": "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
    //                                 "name": "Ferrari",
    //                                 "nationality": "Italian"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 "season": "2008",
    //                 "round": "18",
    //                 "DriverStandings": [
    //                     {
    //                         "position": "1",
    //                         "positionText": "1",
    //                         "points": "98",
    //                         "wins": "5",
    //                         "Driver": {
    //                             "driverId": "hamilton",
    //                             "permanentNumber": "44",
    //                             "code": "HAM",
    //                             "url": "http://en.wikipedia.org/wiki/Lewis_Hamilton",
    //                             "givenName": "Lewis",
    //                             "familyName": "Hamilton",
    //                             "dateOfBirth": "1985-01-07",
    //                             "nationality": "British"
    //                         },
    //                         "Constructors": [
    //                             {
    //                                 "constructorId": "mclaren",
    //                                 "url": "http://en.wikipedia.org/wiki/McLaren",
    //                                 "name": "McLaren",
    //                                 "nationality": "British"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 "season": "2009",
    //                 "round": "17",
    //                 "DriverStandings": [
    //                     {
    //                         "position": "1",
    //                         "positionText": "1",
    //                         "points": "95",
    //                         "wins": "6",
    //                         "Driver": {
    //                             "driverId": "button",
    //                             "permanentNumber": "22",
    //                             "code": "BUT",
    //                             "url": "http://en.wikipedia.org/wiki/Jenson_Button",
    //                             "givenName": "Jenson",
    //                             "familyName": "Button",
    //                             "dateOfBirth": "1980-01-19",
    //                             "nationality": "British"
    //                         },
    //                         "Constructors": [
    //                             {
    //                                 "constructorId": "brawn",
    //                                 "url": "http://en.wikipedia.org/wiki/Brawn_GP",
    //                                 "name": "Brawn",
    //                                 "nationality": "British"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 "season": "2010",
    //                 "round": "19",
    //                 "DriverStandings": [
    //                     {
    //                         "position": "1",
    //                         "positionText": "1",
    //                         "points": "256",
    //                         "wins": "5",
    //                         "Driver": {
    //                             "driverId": "vettel",
    //                             "permanentNumber": "5",
    //                             "code": "VET",
    //                             "url": "http://en.wikipedia.org/wiki/Sebastian_Vettel",
    //                             "givenName": "Sebastian",
    //                             "familyName": "Vettel",
    //                             "dateOfBirth": "1987-07-03",
    //                             "nationality": "German"
    //                         },
    //                         "Constructors": [
    //                             {
    //                                 "constructorId": "red_bull",
    //                                 "url": "http://en.wikipedia.org/wiki/Red_Bull_Racing",
    //                                 "name": "Red Bull",
    //                                 "nationality": "Austrian"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 "season": "2011",
    //                 "round": "19",
    //                 "DriverStandings": [
    //                     {
    //                         "position": "1",
    //                         "positionText": "1",
    //                         "points": "392",
    //                         "wins": "11",
    //                         "Driver": {
    //                             "driverId": "vettel",
    //                             "permanentNumber": "5",
    //                             "code": "VET",
    //                             "url": "http://en.wikipedia.org/wiki/Sebastian_Vettel",
    //                             "givenName": "Sebastian",
    //                             "familyName": "Vettel",
    //                             "dateOfBirth": "1987-07-03",
    //                             "nationality": "German"
    //                         },
    //                         "Constructors": [
    //                             {
    //                                 "constructorId": "red_bull",
    //                                 "url": "http://en.wikipedia.org/wiki/Red_Bull_Racing",
    //                                 "name": "Red Bull",
    //                                 "nationality": "Austrian"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 "season": "2012",
    //                 "round": "20",
    //                 "DriverStandings": [
    //                     {
    //                         "position": "1",
    //                         "positionText": "1",
    //                         "points": "281",
    //                         "wins": "5",
    //                         "Driver": {
    //                             "driverId": "vettel",
    //                             "permanentNumber": "5",
    //                             "code": "VET",
    //                             "url": "http://en.wikipedia.org/wiki/Sebastian_Vettel",
    //                             "givenName": "Sebastian",
    //                             "familyName": "Vettel",
    //                             "dateOfBirth": "1987-07-03",
    //                             "nationality": "German"
    //                         },
    //                         "Constructors": [
    //                             {
    //                                 "constructorId": "red_bull",
    //                                 "url": "http://en.wikipedia.org/wiki/Red_Bull_Racing",
    //                                 "name": "Red Bull",
    //                                 "nationality": "Austrian"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 "season": "2013",
    //                 "round": "19",
    //                 "DriverStandings": [
    //                     {
    //                         "position": "1",
    //                         "positionText": "1",
    //                         "points": "397",
    //                         "wins": "13",
    //                         "Driver": {
    //                             "driverId": "vettel",
    //                             "permanentNumber": "5",
    //                             "code": "VET",
    //                             "url": "http://en.wikipedia.org/wiki/Sebastian_Vettel",
    //                             "givenName": "Sebastian",
    //                             "familyName": "Vettel",
    //                             "dateOfBirth": "1987-07-03",
    //                             "nationality": "German"
    //                         },
    //                         "Constructors": [
    //                             {
    //                                 "constructorId": "red_bull",
    //                                 "url": "http://en.wikipedia.org/wiki/Red_Bull_Racing",
    //                                 "name": "Red Bull",
    //                                 "nationality": "Austrian"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 "season": "2014",
    //                 "round": "19",
    //                 "DriverStandings": [
    //                     {
    //                         "position": "1",
    //                         "positionText": "1",
    //                         "points": "384",
    //                         "wins": "11",
    //                         "Driver": {
    //                             "driverId": "hamilton",
    //                             "permanentNumber": "44",
    //                             "code": "HAM",
    //                             "url": "http://en.wikipedia.org/wiki/Lewis_Hamilton",
    //                             "givenName": "Lewis",
    //                             "familyName": "Hamilton",
    //                             "dateOfBirth": "1985-01-07",
    //                             "nationality": "British"
    //                         },
    //                         "Constructors": [
    //                             {
    //                                 "constructorId": "mercedes",
    //                                 "url": "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
    //                                 "name": "Mercedes",
    //                                 "nationality": "German"
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ];


    console.log(champData);
    const years = this.getArrayOfYears();
    //console.log(JSON.stringify(champData));
    // let generatedData = this.generatorChampionsInfo(this.state.winners);
    // console.log(generatedData.next());
    //this.queryWinners();
    // console.log(this.state.races);
    //this.getChamps(this.state.champData);
    return (
      <div className="OuterContainer">
        <Sidebar>
          <ScrollableLinkList links={years} />
        </Sidebar>
        <div className="InnerContainer">
          {/* {
            years.map((year) =>{
              return (
            <ScrollableContentSection
            key={`_${year}`}
            name={year}
            content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
            />
              );
            })
          } */}
          {
            champData.map((champ) => {
              let {
                season: year,
                DriverStandings: [
                {
                  Driver: {
                    givenName: firstName,
                    familyName: lastName,
                  }
                }
                ]
              } = champ;

              return (
                <ScrollableContentSection
                  key={`_${year}`}
                  name={year}
                  champion={`${firstName} ${lastName}`}
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
