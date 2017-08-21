import React from 'react';
import PropTypes from 'prop-types';
import {ScrollableContentSection} from './ScrollableContentSection';
import {RaceList} from '../components/RaceList';
import {LoadingTable} from '../components/LoadingTable';

export const ScrollableContentSectionList = ({ selectedYear, isFetching, racesByYear, seasons}) => (
  <div>
    {
      seasons.map((season) => {

        let thisYearsRaces = racesByYear[season.year];
        let isEmpty = true;
        if (thisYearsRaces){
          isEmpty = thisYearsRaces.length === 0;
        }
        return (
          isEmpty ?
            isFetching ?
              <ScrollableContentSection
                key={`_${season.year}`}
                year={season.year}
                champion={`${season.worldChampion}`}
                content={<LoadingTable />} //<RaceList races={racesByYear[season.year]} />
              />
            :
            <ScrollableContentSection
              key={`_${season.year}`}
              year={season.year}
              champion={`${season.worldChampion}`}
              content={<LoadingTable />} //<RaceList races={racesByYear[season.year]} />
            />
          :
          <ScrollableContentSection
            key={`_${season.year}`}
            year={season.year}
            lastUpdated={new Date(thisYearsRaces.lastUpdated).toLocaleString()}
            champion={`${season.worldChampion}`}
            content={<RaceList races={thisYearsRaces.items} worldChampion={season.worldChampion} />} //<RaceList races={racesByYear[season.year]} />
          />
        )
      })
    }
  </div>
    );
// ScrollableContentSectionList.PropTypes
