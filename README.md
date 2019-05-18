Homework assignment for Payworks recruitment process

## How to run it locally?
Use `yarn` or `npm install` to install all dependencies.

`yarn start` or `npm start` to run the app\
`yarn test` to run unit/integration tests\
`yarn test:e2e` to run e2e tests (**run the app first!**)

## Project structure
* `e2e` - end to end tests
* `public` - public files
* `src` - source
	* `components` - React components
		* `*Route` root components for each route
	* `containers` - `unstated` containers to store the state of the application
	* `hooks` - React hooks
		* `useDebounce` - hooks-based debounce functionality
	* `services` - XHR requests
* `index.js` - render's the app


## Technologies
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

I chose React framework to write this application because it's the technology which I recently worked 
the most with and I think it's great for small projects like this one as well as for large applications.

As a state management library I chose `unstated` for two reasons: 
* It seemed to be very simple 
(not too complex for such small app).
* I've never used it before and I wanted to learn something new.

### Dependencies
* `axios` - for XHR requests
* `bootstrap` - to make it look a little bit nicer
* `react-router-dom` - routing library for React
* `unstated` - simple library for state management
* `unstated-connect` - to easily connect components with unstated containers
* `lodash.debounce` - for debounce functionality used for organization's input 

### Devlopment dependencies
* `jest` - testing framework integrated into Create React App
* `puppeteer` - to run e2e tests in headless Chrome
* `jest-puppeteer` - for writing e2e tests and run them using Puppeteer 
* `react-testing-library` and `react-hooks-testing-library` - testing utils
* `sinon` - testing utils used in this project just for faking timers/setTimeout functionality
