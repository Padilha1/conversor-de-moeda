import { Grid, Button } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useCurrency } from "../context/CurrencyContext";

function SwitchCurrency() {
  const { fromCurrency, setFromCurrency, toCurrency, setToCurrency } =
    useCurrency();

  const handleSwitch = () => {
    setToCurrency(fromCurrency);
    setFromCurrency(toCurrency);
  };

  return (
    <Grid item xs={12} md="auto">
      <Button
        onClick={handleSwitch}
        sx={{
          borderRadius: 1,
          height: "100%",
          color: "white",
        }}
      >
        <CompareArrowsIcon
          sx={{
            fontSize: 30,
          }}
        />
      </Button>
    </Grid>
  );
}

export default SwitchCurrency;
