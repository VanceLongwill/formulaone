import React from 'react';
import PropTypes from 'prop-types';
import {ScrollableContentSection} from './ScrollableContentSection';
import {RaceList} from '../components/RaceList';
import {LoadingTable} from '../components/LoadingTable';

export const ScrollableContentSectionList = ({ selectedYear, races, racesByYear, seasons}) => (
  <div>
    {
      seasons.map((season) => {

        let thisYearsRaces = racesByYear[season.year];

        let nonActiveContent;

        if (thisYearsRaces){
          let isFetching = thisYearsRaces.length === 0;
          if (!isFetching){
            nonActiveContent = (
              <div style={{ opacity:  1 , width: '100%', height: '100%' }}>
                <RaceList races={thisYearsRaces.items} worldChampion={season.worldChampion} />
              </div>
            );
          } else {
            nonActiveContent = (
              <div style={{ opacity:  1, width: '100%', height: '100%' }}>
                <LoadingTable />
                {/* <RaceList races={new Array(10).fill("")} /> */}
              </div>
            );
          }
        } else {
          nonActiveContent = (
            <div style={{ opacity:  1, width: '100%', height: '100%' }}>
              <LoadingTable />
              {/* <RaceList races={new Array(10).fill("")} /> */}
            </div>
          );
        }
        //  let nonActiveContent = racesByYear[season.year] || <h4> No data fetched yet </h4>;
        //if ( racesByYear[season.year] )
        return (
          <ScrollableContentSection
            key={`_${season.year}`}
            year={season.year}
            champion={`${season.worldChampion}`}
            content={nonActiveContent} //<RaceList races={racesByYear[season.year]} />
          />
        )

        //
        // if (season.year==selectedYear){
        //   return (
        //     <div>
        //       <ScrollableContentSection
        //         key={`_${season.year}`}
        //         year={season.year}
        //         champion={`${season.worldChampion}`}
        //       >
        //         {/* <div style={{ opacity: isFetching ? 0.5 : 1, height: '100%', width: '100%'}}> */}
        //         <RaceList races={races} worldChampion={season.worldChampion} />
        //         {/* </div> */}
        //       </ScrollableContentSection>
        //
        //     </div>
        //   );
        //
        //   // } else if (racesByYear[season.year] !== 0){
        //   //   console.log("VLOG season YEAR: " + season.year)
        //   //   console.log("VLOG: LIST OBJECT" + racesByYear)
        //   //   return (
        //   //     <ScrollableContentSection
        //   //       key={`_${season.year}`}
        //   //       year={season.year}
        //   //       champion={`${season.worldChampion}`}
        //   //       content={<RaceList races={racesByYear[season.year]} />}
        //   //     />
        //   //   )
        // }
        // else {
        //   console.log('NOT ACTIVE YEAR  data; ');
        //   console.log( racesByYear);
        //   console.log("cached");
        //   console.log(racesByYear[season.year]);
        //   let thisYearsRaces = racesByYear[season.year];
        //   let nonActiveContent;
        //   if (thisYearsRaces){
        //     nonActiveContent = (
        //       <div style={{ opacity:  1 , width: '100%', height: '100%' }}>
        //         <RaceList races={thisYearsRaces.items} worldChampion={season.worldChampion} />
        //       </div>
        //     );
        //   } else {
        //     nonActiveContent = (
        //       <div style={{ opacity:  0.5 , width: '100%', height: '100%' }}>
        //         <LoadingTable />
        //         {/* <RaceList races={new Array(10).fill("")} /> */}
        //       </div>
        //     );
        //   }
        //   //  let nonActiveContent = racesByYear[season.year] || <h4> No data fetched yet </h4>;
        //   //if ( racesByYear[season.year] )
        //   return (
        //     <ScrollableContentSection
        //       key={`_${season.year}`}
        //       year={season.year}
        //       champion={`${season.worldChampion}`}
        //       content={nonActiveContent} //<RaceList races={racesByYear[season.year]} />
        //     />
        //   )
        // }
      })

    }
  </div>
    );
// ScrollableContentSectionList.PropTypes
