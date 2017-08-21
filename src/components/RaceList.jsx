import React from 'react';
import { Grid } from 'semantic-ui-react';
import '../css/RaceList.css';

const RaceList = ({ races, worldChampion }) => (
  <Grid
    columns={2}
    className="raceTable"
    textAlign="center"
    verticalAlign="middle"
  >
    {/*  Head of Table */}
    <Grid.Row className="gridHeaders">
      <Grid.Column>Race</Grid.Column>
      <Grid.Column /* only='computer' */>Winner</Grid.Column>
    </Grid.Row>

    {/* Rows of Data */}
    {
      races.map((race) => {
        // Highlight rows by toggleing a css class if the winner of the race was also the winner of the world championship that year
        const toggleClass = (race.winner === worldChampion) ? 'champ' : '';
        return (
          <Grid.Row className={`raceRow ${toggleClass}`}>
            <Grid.Column className="raceColumn">{race.name}</Grid.Column>
            <Grid.Column className="winnerColumn" /* only='computer' */>{race.winner}</Grid.Column>
          </Grid.Row>
        );
      })
    }
  </Grid>

);

export default RaceList;
