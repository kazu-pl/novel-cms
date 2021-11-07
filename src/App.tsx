import { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import CreateGlobalStyle from "common/styles/globalStyles.styled";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Router from "./Router";

import muiTheme from "common/theme/muiTheme";

function App() {
  return (
    <Suspense fallback={<CircularProgress size={80} />}>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={muiTheme}>
          <StyledThemeProvider theme={muiTheme}>
            <CssBaseline />
            <CreateGlobalStyle />
            <SnackbarProvider>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </SnackbarProvider>
          </StyledThemeProvider>
        </MuiThemeProvider>
      </StyledEngineProvider>
    </Suspense>
  );
}

export default App;
