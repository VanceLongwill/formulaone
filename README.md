
---

#[Formula One App](https://vancelongwill.github.io/formulaone/) 
###live demo on GitHub pages

---


*Current Version: 0.1*


**Key features**

* Clean and reusable code following AirBnB's [React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
* Separation of components redux
* Responsive design
* Minimalist / clean ux design
* Mobile friendly
* Animated transitions
* Asynchronous lazy loading 
* This model is highly scalable (ie with larger amounts of data to fetch - try setting a larger range of years in config.js)

**Key functions**

* Presents a list of Formula One world champions by year from the ergast API (prefetched)
* When a year is selected, the ergast API is queried for the races from that year
* Race data and the list of world champions are stored as state in a redux store which is connected to the root container component - App - via props.
* The names of the races by year and their respective winners is rendered as a table
* If driver who won the race was also the world champion that year, the table row is highlighted light blue


**Dependencies**

* [create-react-app](https://github.com/facebookincubator/create-react-app) was used as a boilerplate
* [babel](https://github.com/babel/babel) including the transform-class-properties plugin for es6+ features & syntax
* [semantic-ui-react](https://github.com/Semantic-Org/Semantic-UI-React) for responsive UI components
* [react-view-pager](https://github.com/souporserious/react-view-pager) for animated transitions on the sidebar/carousel
* [react-redux](https://github.com/reactjs/react-redux) for redux react bindings
* [redux](http://redux.js.org/) as a react state container 
* [redux-thunk](https://github.com/gaearon/redux-thunk) to provide middleware enabling async functions / promises
* [react-scroll](https://github.com/fisshy/react-scroll) to track scrolling position
* [semantic-ui-css](https://github.com/Semantic-Org/Semantic-UI-CSS) minimal stylings for semantic-ui components (Grid)
* [halogen](https://github.com/yuanyan/halogen) for loading animations


**Things I would do with more time**

* Add BEM naming convention for CSS or move CSS styles inline
* Make use of browser [localStorage API](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage) for data persistence
* Add PropTypes for better testing / debugging
* Testing with Mocha / Istanbul

## How to install 
Assuming node / npm / yarn is already installed:  

* Clone this repo & move into project root directory

`git clone https://github.com/VanceLongwill/formulaone.git && cd formulaone` 

* Install node modules

`yarn install` or `npm install`

* Start the server 

`yarn start` or `npm start`

* Go to `https://localhost:3000`

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