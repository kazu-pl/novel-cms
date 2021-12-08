import { createBrowserHistory } from "history";
export default createBrowserHistory();

// This could be used in react-router-dom v5 like this. Import this in App.tsx and use like so:

// import history from "common/router/history";

// <Router history={history}>
// </Router>

// then you can use it in redux actions to handle pushes

// source: https://stackoverflow.com/questions/51388553/react-router-axios-interceptors-how-to-do-a-redirect

// <Router location={history.location} navigator={history}></Router> usage here:  https://stackoverflow.com/questions/69859509/cannot-read-properties-of-undefined-reading-pathname-when-testing-pages-in
// it changes url but does not change UI
