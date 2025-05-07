import React, { useState } from "react";
import {
  Typography,
  Box,
  Container,
  TextField,
  Grid,
  Paper,
  Button,
} from "@mui/material";

const Home = ({ darkMode }) => {
  const [loanAmount, setLoanAmount] = useState("100000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [loanTerm, setLoanTerm] = useState("5");

  const handleCalculate = () => {
    // Placeholder: Later call useEmiCalculator custom hook
    console.log({ loanAmount, interestRate, loanTerm });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 6,
        mb: 4,
        p: 0,
        width: "100%",
        height: "100%",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: darkMode ? "#1e1e1e" : "#ffffff",
          color: darkMode ? "#ffffff" : "#000000",
          width: "100%",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Loan Calculator Dashboard
        </Typography>

        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Loan Amount (P)"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              variant="outlined"
              InputProps={{
                sx: { bgcolor: darkMode ? "#333333" : "#ffffff" },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Interest Rate (%)"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              variant="outlined"
              InputProps={{
                sx: { bgcolor: darkMode ? "#333333" : "#ffffff" },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Loan Term (Years)"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              variant="outlined"
              InputProps={{
                sx: { bgcolor: darkMode ? "#333333" : "#ffffff" },
              }}
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <Box mt={2}>
              <Button
                variant="contained"
                color={darkMode ? "primary" : "primary"}
                size="large"
                onClick={handleCalculate}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                  bgcolor: darkMode ? "#1976d2" : "#1976d2",
                  color: "#ffffff",
                }}
              >
                CALCULATE EMI
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Home;
