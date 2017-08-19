export function* generatorChampionsInfo(champArray) {
  for ( let {
     season: sezon,
     DriverStandings: [
    {
      Driver: {
        givenName: firstName,
        familyName: lastName,
      }
    }
     ]
  } of champArray ) {
    yield (sezon, firstName, lastName);
  }
}
