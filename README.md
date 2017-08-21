
---

[Formula One App](https://vancelongwill.github.io/formulaone/) *(live demo on GitHub pages)*

**NOTE: Currently not working due to cross-origin request to API (browser security blocks the app)**

`Mixed Content: The page at 'https://vancelongwill.github.io/formulaone/' was loaded over HTTPS, but requested an insecure resource 'http://ergast.com/api/f1/driverStandings/1.json?offset=55&limit=11'. This request has been blocked; the content must be served over HTTPS.`

---

Suggestions, improvements, and bug reports are more than welcome. 

*Current Version: 0.1*


**Key features**

* Clean and reusable code following AirBnB's [React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
* Separation of components redux
* Responsive design
* Minimalist / clean ux design
* Mobile friendly


**Key functions**

* Presents a list of Formula One world champions by year from the ergast API
* When a year is selected, the ergast API is queried for the races from that year
* Races and champions are stored in a redux store which is connected to the root container component - App.
* Animated transitions

**Dependencies**

* [Create React App](https://github.com/facebookincubator/create-react-app) was used as a boilerplate
* [babel](https://github.com/babel/babel) including the transform-class-properties plugin for es6+ features & syntax
* [remantic-ui-react](https://github.com/Semantic-Org/Semantic-UI-React) for responsive UI components
* [react-view-pager](https://github.com/souporserious/react-view-pager) for animated transitions on the sidebar/carousel
* [react-redux]()
* [redux]()
* [redux-thunk]() to provide middleware for async functions / promisers
* [react-scroll]() to track scrolling position and create sections
* [semantic-ui-css]() minimal stylings for semantic-ui components (Grid)
* [halogen]() for animated loading components


**Things I would do with more time**

* Add BEM naming convention for CSS or move CSS styles inline
* Make use of browser [localStorage API](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage) for data persistence
* Clean up 
* Add PropTypes for better testing / debugging
* Testing with Mocha / Istanbul

## How to install

* Clone this repo

`git clone https://github.com/VanceLongwill/formulaone.git` 

* Install node modules

`yarn install` or `npm install`

* Start the server 

`yarn start` or `npm start`

### Config
`./src/config.js` 
Config file for app-wide variables

 Can be used to:
 
* fetch a different range of years' data (`STARTING_YEAR`, `ENDING_YEAR`)
* choose which year is fetched first & selected (`DEFAULT_ACTIVE_YEAR`)
 - Example: select the median year as default
`const DEFAULT_ACTIVE_YEAR = ENDING_YEAR-(Math.round((ENDING_YEAR-STARTING_YEAR)/2)); `


* Set the API's root url (`ROOT_URL`)



*Vance Longwill*