
---

[Formula One App](https://vancelongwill.github.io/formulaone/) *(live demo on GitHub pages)*

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




**Things I would like to do when I have time**

* Add BEM naming convention for CSS or move CSS styles inline
* Make use of browser [localStorage API](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage) for data persistence
* Clean up 


*Vance Longwill*