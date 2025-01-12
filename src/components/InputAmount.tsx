import { Grid, InputAdornment, TextField } from "@mui/material";
import { useCurrency } from "../context/CurrencyContext";

function InputAmount() {
  const { firstAmount, setFirstAmount } = useCurrency();

  return (
    <Grid item xs={12} md sx={{ color: "white" }}>
      <TextField
        value={firstAmount}
        onChange={(e) => setFirstAmount(e.target.value)}
        label="Valor"
        fullWidth
        InputProps={{
          type: "number",
          startAdornment: (
            <InputAdornment position="start">
              <span style={{ color: "white" }}>$</span>
            </InputAdornment>
          ),
          sx: {
            color: "white", // Cor do texto digitado
          },
        }}
        InputLabelProps={{
          sx: {
            color: "gray", // Cor do label
            "&.Mui-focused": {
              color: "white", // Cor do label quando focado
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "gray", // Cor da borda padrão
            },
            "&:hover fieldset": {
              borderColor: "white", // Cor da borda ao passar o mouse
            },
            "&.Mui-focused fieldset": {
              borderColor: "white", // Cor da borda quando focado
            },
          },
        }}
      />
    </Grid>
  );
}

export default InputAmount;
