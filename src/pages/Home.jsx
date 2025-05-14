import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Container,
  TextField,
  Grid,
  Paper,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

const currencyOptions = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"];

const Home = ({ darkMode }) => {
  const [loanAmount, setLoanAmount] = useState("100000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [loanTerm, setLoanTerm] = useState("5");
  const [currency, setCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({});
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => {
        setExchangeRates(res.data.rates);
      })
      .catch((err) => console.error("Exchange rate fetch failed:", err));
  }, []);

  const calculateAmortization = () => {
    const baseAmount = parseFloat(loanAmount);
    const rate = exchangeRates[currency] || 1;
    const convertedAmount = baseAmount / rate;

    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseInt(loanTerm) * 12;

    const EMI =
      (convertedAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    let balance = convertedAmount;
    let amortization = [];

    for (let month = 1; month <= n; month++) {
      const interest = balance * r;
      const principal = EMI - interest;
      balance -= principal;

      amortization.push({
        month,
        principal: (principal * rate).toFixed(2),
        interest: (interest * rate).toFixed(2),
        balance: (balance > 0 ? balance * rate : 0).toFixed(2),
      });
    }

    setSchedule(amortization);
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

        {/* Input Fields */}
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Loan Amount (Base USD)"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              variant="outlined"
              InputProps={{
                sx: { bgcolor: darkMode ? "#333333" : "#ffffff" },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
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

          <Grid item xs={12} sm={3}>
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

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
                Currency
              </InputLabel>
              <Select
                value={currency}
                label="Currency"
                onChange={(e) => setCurrency(e.target.value)}
                sx={{
                  bgcolor: darkMode ? "#333333" : "#ffffff",
                  color: darkMode ? "#ffffff" : "#000000",
                }}
              >
                {currencyOptions.map((cur) => (
                  <MenuItem key={cur} value={cur}>
                    {cur}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <Box mt={2}>
              <Button
                variant="contained"
                size="large"
                onClick={calculateAmortization}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                  bgcolor: "#1976d2",
                  color: "#ffffff",
                }}
              >
                CALCULATE EMI
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Amortization Table */}
        {schedule.length > 0 && (
          <Box mt={5} sx={{ maxHeight: "400px", overflowY: "auto" }}>
            <Typography variant="h5" gutterBottom>
              Amortization Schedule ({currency})
            </Typography>
            <Table
              sx={{
                minWidth: 650,
                bgcolor: darkMode ? "#121212" : "#f5f5f5",
              }}
            >
              <TableHead>
                <TableRow sx={{ bgcolor: darkMode ? "#1e1e1e" : "#e0e0e0" }}>
                  <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
                    Month
                  </TableCell>
                  <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
                    Principal
                  </TableCell>
                  <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
                    Interest
                  </TableCell>
                  <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
                    Remaining Balance
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((row) => (
                  <TableRow
                    key={row.month}
                    sx={{
                      bgcolor: darkMode ? "#212121" : "#ffffff",
                    }}
                  >
                    <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
                      {row.month}
                    </TableCell>
                    <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
                      {row.principal} {currency}
                    </TableCell>
                    <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
                      {row.interest} {currency}
                    </TableCell>
                    <TableCell sx={{ color: darkMode ? "#ffffff" : "#000000" }}>
                      {row.balance} {currency}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Home;