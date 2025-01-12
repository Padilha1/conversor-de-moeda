import { Typography, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import InputAmount from "./components/InputAmount";
import SwitchCurrency from "./components/SwitchCurrency";
import SelectCountry from "./components/SelectCountry";
import { useCurrency } from "./context/CurrencyContext";
import axios from "axios";
import Box from "@mui/material/Box/Box";

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useCurrency();

  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];

  useEffect(() => {
    if (firstAmount) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: import.meta.env.VITE_API_KEY,
          base_currency: codeFromCurrency,
          currencies: codeToCurrency,
        },
      })
        .then((response) =>
          setResultCurrency(response.data.data[codeToCurrency])
        )
        .catch((error) => console.log(error));
    }
  }, [firstAmount, fromCurrency, toCurrency]);

  const boxStyles = {
    marginTop: "11rem",
    background: "#49305F",
    textAlign: "center",
    color: "white",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative",
  };

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
        Conversor de Moedas
      </Typography>
      <Grid container spacing={2}>
        <InputAmount />
        <SelectCountry
          value={fromCurrency}
          setValue={setFromCurrency}
          label="De"
        />
        <SwitchCurrency />
        <SelectCountry
          value={toCurrency}
          setValue={setToCurrency}
          label="Para"
        />
      </Grid>

      {firstAmount ? (
        <Box
          sx={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Typography sx={{ fontSize: 24 }}>
            {new Intl.NumberFormat("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(Number(firstAmount))}{" "}
            {fromCurrency.split(" ")[1]}
          </Typography>
          <Typography sx={{ fontSize: 28 }}> = </Typography>
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: codeToCurrency,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(resultCurrency * Number(firstAmount))}{" "}
            {codeToCurrency}{" "}
          </Typography>
        </Box>
      ) : (
        ""
      )}
    </Container>
  );
}

export default App;
