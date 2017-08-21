import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import '../css/RaceList.css';

export class RaceList extends Component {
  render() {
    const { races, worldChampion } = this.props;
    return (
      <Grid
        columns={2}
        className="raceTable"
        textAlign="center"
        verticalAlign="middle"
        // columns="equal"
        // centered
        // stretched
        // stackable={true}
        // divided={true}
        // padded={false}
        // container={true}
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
  }
}
