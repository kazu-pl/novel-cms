import { createBrowserHistory } from "history";
export default createBrowserHistory();

// This could be used in react-router-dom v5 like this. Import this in App.tsx and use like so:

// import history from "common/router/history";

// <Router history={history}>
// </Router>

// then you can use it in redux actions to handle pushes
