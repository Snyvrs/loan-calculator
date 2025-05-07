// pages/ErrorPage.js
import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      px={2}
    >
      <Typography variant="h5" gutterBottom>
        Something went wrong in the application.
      </Typography>
      <Button
        variant="outlined"
        onClick={handleGoHome}
        sx={{ mt: 2, textTransform: "none" }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default Error;
