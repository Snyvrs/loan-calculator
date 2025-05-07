import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import ExchangeRates from "./pages/ExchangeRates";
import About from "./pages/About";
import ErrorPage from "./pages/Error";

const App = () => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode as shown in images

  // Create theme based on dark mode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#000000",
      },
    },
  });

  // Handle theme change
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    // Update document body styles to match the theme
    document.body.style.backgroundColor = darkMode ? "white" : "black";
    document.body.style.color = darkMode ? "black" : "white";
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures the background color extends fully */}
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh", // Make sure the app takes the full viewport height
            width: "100%", // Full width
            bgcolor: "background.default",
          }}
        >
          {/* Navbar */}
          <AppBar
            position="static"
            sx={{
              backgroundColor: darkMode ? "#000000" : "#1976d2",
              width: "100%", // Ensure navbar takes full width
            }}
          >
            <Toolbar sx={{ justifyContent: "space-between", width: "100%" }}>
              <Typography variant="h6" component="div">
                Loan Calculator
              </Typography>

              <Box display="flex" alignItems="center">
                <NavLink
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "contained" : "text"}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        mx: 1,
                        backgroundColor: isActive
                          ? darkMode
                            ? "rgba(255,255,255,0.1)"
                            : undefined
                          : "transparent",
                      }}
                    >
                      HOME
                    </Button>
                  )}
                </NavLink>

                <NavLink
                  to="/exchange-rates"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "contained" : "text"}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        mx: 1,
                        backgroundColor: isActive
                          ? darkMode
                            ? "rgba(255,255,255,0.1)"
                            : undefined
                          : "transparent",
                      }}
                    >
                      EXCHANGE RATES (LIVE)
                    </Button>
                  )}
                </NavLink>

                <NavLink
                  to="/about"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "contained" : "text"}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        mx: 1,
                        backgroundColor: isActive
                          ? darkMode
                            ? "rgba(255,255,255,0.1)"
                            : undefined
                          : "transparent",
                      }}
                    >
                      ABOUT
                    </Button>
                  )}
                </NavLink>

                <NavLink
                  to="/error"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "contained" : "text"}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        mx: 1,
                        backgroundColor: isActive
                          ? darkMode
                            ? "rgba(255,255,255,0.1)"
                            : undefined
                          : "transparent",
                      }}
                    >
                      ERROR PAGE
                    </Button>
                  )}
                </NavLink>

                <Switch
                  checked={darkMode}
                  onChange={handleThemeChange}
                  color="default"
                  sx={{ ml: 2 }}
                />
              </Box>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              bgcolor: "background.default",
              p: 0,
              m: 0,
            }}
          >
            <Routes>
              <Route path="/" element={<Home darkMode={darkMode} />} />
              <Route
                path="/exchange-rates"
                element={<ExchangeRates darkMode={darkMode} />}
              />
              <Route path="/about" element={<About darkMode={darkMode} />} />
              <Route
                path="/error"
                element={<ErrorPage darkMode={darkMode} />}
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
