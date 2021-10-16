import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import CreateGlobalStyle from "common/styles/globalStyles.styled";
import { Router as ReactRouter } from "react-router-dom";

import Router from "./Router";
import history from "common/router/history";
import muiTheme from "common/theme/muiTheme";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={muiTheme}>
        <StyledThemeProvider theme={muiTheme}>
          <CssBaseline />
          <CreateGlobalStyle />
          <ReactRouter history={history}>
            <Router />
          </ReactRouter>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
