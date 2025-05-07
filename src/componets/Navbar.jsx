import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "white" : "black";
    document.body.style.color = darkMode ? "black" : "white";
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Loan Calculator
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <NavLink to="/" style={navLinkStyle}>
            {({ isActive }) => (
              <Button
                variant={isActive ? "contained" : "text"}
                sx={buttonStyle}
              >
                HOME
              </Button>
            )}
          </NavLink>

          <NavLink to="/exchange-rates" style={navLinkStyle}>
            <Button sx={buttonStyle}>EXCHANGE RATES (LIVE)</Button>
          </NavLink>

          <NavLink to="/about" style={navLinkStyle}>
            <Button sx={buttonStyle}>ABOUT</Button>
          </NavLink>

          <NavLink to="/error" style={navLinkStyle}>
            <Button sx={buttonStyle}>ERROR PAGE</Button>
          </NavLink>

          <Switch
            checked={darkMode}
            onChange={handleThemeChange}
            color="default"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Styling functions
const navLinkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const buttonStyle = {
  color: "white",
  fontWeight: "bold",
  textTransform: "none",
};

export default Navbar;

