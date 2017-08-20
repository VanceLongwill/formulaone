import React, {Component} from 'react';
import * as Table from 'reactabular-table';
import '../css/RaceList.css';


import { Grid } from 'semantic-ui-react';

const columns = [
  {
    property: 'name',
    header: {
      label: 'Race',
    }
  },
  {
    property: 'winner',
    header: {
      label: 'Winner'
    },
    cell: {
      formatters: [
        winner => winner //===worldChampion ? `{winner} (world champion)` : winner
      ]
    }
  },

];


export class RaceList extends Component {
  render(){
    let {races, worldChampion} = this.props;

    // if (races.length===0) {
    //   return(
    //       <p>laoding</p>
    //       )
    // } else {
    //
    // }
    console.log("Racelist - Champ: " + worldChampion);
    return(
      // <Table.Provider
      //   className="pure-table pure-table-striped"
      //   columns={columns}
      //
      // >
      //   <Table.Header />
      //
      //   <Table.Body rows={races} rowKey="name" />
      // </Table.Provider>
      //
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

// import Griddle, { plugins, RowDefinition, ColumnDefinition} from 'griddle-react'; yarn remove
//
// export const RaceList = ({ races }) => (
//
//    <Griddle
//      data={races}
//      plugins={[plugins.LocalPlugin]}
//    >
//      <RowDefinition>
//        <ColumnDefinition id="name" title="Races"/>
//        <ColumnDefinition id="winner" title="Winner"/>
//      </RowDefinition>
//    </Griddle>
//
// )
