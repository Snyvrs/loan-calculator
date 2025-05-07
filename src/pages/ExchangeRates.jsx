import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
} from "@mui/material";

const ExchangeRates = ({ darkMode }) => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await res.json();
        const rateEntries = Object.entries(data.rates).map(
          ([currency, rate]) => ({
            currency,
            rate,
          })
        );
        setRates(rateEntries);
      } catch (error) {
        console.error("Failed to fetch exchange rates", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        width: "100%",
        px: 0,
        py: 2,
        bgcolor: darkMode ? "#121212" : "#f5f5f5",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          px: 2,
          color: darkMode ? "#ffffff" : "#000000",
          mb: 2,
        }}
      >
        Live Exchange Rates (Base: USD)
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              mx: 0,
              boxShadow: "none",
              borderRadius: 0,
              bgcolor: "transparent",
            }}
          >
            <Table sx={{ minWidth: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: darkMode ? "#ffffff" : "#000000",
                      bgcolor: darkMode ? "#000000" : "#f5f5f5",
                    }}
                  >
                    Currency
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: "bold",
                      color: darkMode ? "#ffffff" : "#000000",
                      bgcolor: darkMode ? "#000000" : "#f5f5f5",
                    }}
                  >
                    Rate
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rates
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={row.currency}
                      sx={{
                        bgcolor: darkMode ? "#1e1e1e" : "#ffffff",
                        "&:hover": {
                          bgcolor: darkMode ? "#333333" : "#e0e0e0",
                        },
                      }}
                    >
                      <TableCell
                        sx={{ color: darkMode ? "#ffffff" : "#000000" }}
                      >
                        {row.currency}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: darkMode ? "#ffffff" : "#000000" }}
                      >
                        {row.rate.toFixed(4)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={rates.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                color: darkMode ? "#ffffff" : "#000000",
                ".MuiTablePagination-selectIcon": {
                  color: darkMode ? "#ffffff" : "#000000",
                },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ExchangeRates;
