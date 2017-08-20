import React, {Component} from 'react';
import { Grid } from 'semantic-ui-react';
import '../css/RaceList.css';

export class RaceList extends Component {
  render(){
    let {races, worldChampion} = this.props;
    return(

      <Grid
        columns={2}
        //stackable={true}
        //divided={true}
        // padded={false}
        // container={true}
        className="raceTable"
        // columns="equal"
        // centered
        // stretched
        textAlign={"center"}
        verticalAlign={"middle"}
      >
        <Grid.Row className="gridHeaders">
          <Grid.Column>Race</Grid.Column>
          <Grid.Column /*only='computer'*/>Winner</Grid.Column>
        </Grid.Row>
        {
          races.map((race) => {
            let toggleClass = (race.winner===worldChampion) ? 'champ' : '';
            return(
              <Grid.Row className={`raceRow ${toggleClass}`}>
                <Grid.Column className="raceColumn">{race.name}</Grid.Column>
                <Grid.Column className="winnerColumn"  /*only='computer'*/>{race.winner}</Grid.Column>
              </Grid.Row>
            )
          })
        }
      </Grid>

    )
  }
}
