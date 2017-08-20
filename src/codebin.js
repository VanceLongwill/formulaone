render() {
  let { champions, yearRange, selectedYear } = this.props;
  let  isFetching = false;
  let  lastUpdated = "2015/06/06";

  console.log("champs : " +champions);
  const isEmpty = champions.length === 0;
  return (

    <div className="OuterContainer">
      <Sidebar>
        <ScrollableLinkList links={yearRange} activeYear={selectedYear} />
      </Sidebar>
      <div className="InnerContainer">

          {/* {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
            }
            {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
            }
            </p>
            {isEmpty
            ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
            : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <ScrollableContentSectionList champions={champions} />
            </div>
          } */}

        </div>
      </div>
  );
}
}





{/* <ViewPager id="viewPager">
  <Frame id="frame" className="frame" accessibility={false}>
    <Track
  ref={
  (c) => { this.track = c; }
  }
  viewsToShow="10"
  axis="y"
  align={0.5}
  animations={animations}
  className="track track-y"
    >
  {
  years.map((year) =>{

  // let isActiveYear = (year === this.state.activeYear);
  // if (isActiveYear) {
  //   console.log(`${yearAsString} is the active year`);
  // }
  // let activeClass = (year==this.state.activeYear) ? "active": "notactive";
  return (
  <View className="view" key={year}>
  <ScrollableLink name={year} onSetActive={this.handleSelectYear}/>
  </View>
  );
  })
  }

    </Track>
  </Frame>
</ViewPager> */}

const animations = [
// {
//   prop: 'scale',
//   stops: [
//     [-500, 0.6],
//     [0, 1],
//     [500, 0.6],
//   ],
// },
{
  prop: 'opacity',
  stops: [
    [-300, 0.0],
    [-200, 0.8],
    [0, 1],
    [200, 0.8],
    [300, 0.0]
  ],
},
// {
//   prop: 'backgroundColor',
//   stops: [
//     [-110, '#b4da55'],
//     [0, '#2ea8ff'],
//     [110, '#b4da55']
//   ]
// },
{
  prop: 'rotateX',
  stops: [
    [-500, -120], // rotate slides to the left
    [0, 0], // they'll be straight at center
    [500, 120] // and rotated to the right
  ],
},
{
  prop: 'translateZ',
  stops: [
    [-500, -150],
    // [-300, -36], // rotate slides to the left
    [0, 20], // they'll be straight at center
    // [300, 36], // and rotated to the right
    [500, -150],
  ]
}
];

// Events.scrollEvent.register('begin', function() {
//   console.log("begin", arguments);
// });
//
// Events.scrollEvent.register('end', function() {
//   console.log("end", arguments);
// });
//

// const FROM_YEAR = 2005;
// const TO_YEAR = 2015;
// const ACTIVE_YEAR = TO_YEAR-(Math.round((TO_YEAR-FROM_YEAR)/2)); // Sets active year to median value of the range of years
// //
// function generateChampionsDataShape() {
//   return getArrayOfYears().map((year) => {
//     return Object.assign({}, {
//       season: year.toString(),
//         DriverStandings: [
//         {
//           Driver: {
//             givenName: "",
//             familyName: "",
//           }
//         }
//         ]
//     });
//   })
// }
// function getArrayOfYears () {
//   return Array.from(new Array(TO_YEAR-FROM_YEAR+1), (x,i) => i + FROM_YEAR);
// }
//
// const initialState = {
//   activeYear: ACTIVE_YEAR,
//   yearRange: [FROM_YEAR, TO_YEAR],
//   races: [],
//   championsData: generateChampionsDataShape(),
// }

// let store = store || initialState;
