import { Grid, InputAdornment, TextField } from "@mui/material";
import React, { useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";

function InputAmount() {

	const {firstAmount, setFirstAmount} = useContext(CurrencyContext)

	return (
		<Grid item xs={12} md sx={{color:"white"}}>
			<TextField
				value={firstAmount}
				onChange={e => setFirstAmount(e.target.value)}
				label="Valor"
				fullWidth
				InputProps={{
					type: "number",
					startAdornment: <InputAdornment position="start">$</InputAdornment>,
				}}
				color="secondary"
			/>
		</Grid>
	);
}

export default InputAmount;
