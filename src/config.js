export const FIRST_DOCUMENTED_YEAR = 1950; // The earliest year available in the API
export const STARTING_YEAR = 2005; // The first year you want to be able to fetch data for
export const ENDING_YEAR = 2015; // The last year you want to be able to fetch data for
export const DEFAULT_ACTIVE_YEAR = 2005; //
export const ROOT_URL = 'https://ergast.com/api/f1/'; // Root url of the ergast API

/*

 Config file for app-wide variables

 Can be used to:
     - fetch a different range of years' data (STARTING_YEAR, ENDING_YEAR)
     - choose which year is fetched first & selected (DEFAULT_ACTIVE_YEAR)
          - This could be used, for example, to select the median year as default
          i.e.
    DEFAULT_ACTIVE_YEAR = ENDING_YEAR-(Math.round((ENDING_YEAR-STARTING_YEAR)/2)); // Sets active year to median value of the range of years

 */
