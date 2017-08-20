import RequestService from './RequestService';

const ROOT_URL = "http://ergast.com/api/f1/";
const RESPONSE_FORMAT = ".json";

class NetworkService {
  // constructor(){
  //   this.presentYear
  // }
  getYear(year){
    var url = `${ROOT_URL}/${year}${RESPONSE_FORMAT}`
    return RequestService.getRequest(url)
  }

  getTopStories(){
    var url = `${ROOT_URL}/topstories/v2/technology.json${RESPONSE_FORMAT}`
    return RequestService.getRequest(url)
  }

  getChampionsFromYearRange(yearRange){
    let yearsToFetch = 10
    let limit = yearsToFetch + 1;
    let firstDocumentedYear = 1950;
    let thisYear = 2015; // new Date().getFullYear(); can be used to get 10 previous seasons' results
    let yearOffset = thisYear - firstDocumentedYear - yearsToFetch;
    var url = `${ROOT_URL}driverStandings/1${RESPONSE_FORMAT}?offset=${yearOffset}&limit=${limit}`;

    return RequestService.getRequest(url);
  }

}

export default new NetworkService();
