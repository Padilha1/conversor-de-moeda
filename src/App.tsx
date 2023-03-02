import { Typography, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import { useContext, useEffect, useState } from "react";
import InputAmount from "./components/InputAmount";
import SwitchCurrency from "./components/SwitchCurrency";
import SelectCountry from "./components/SelectCountry";
import { CurrencyContext } from "./context/CurrencyContext";
import axios from "axios";
import Box from "@mui/material/Box/Box";

function App() {
	const {
		fromCurrency,
		setFromCurrency,
		toCurrency,
		setToCurrency,
		firstAmount,
		setFirstAmount,
	} = useContext(CurrencyContext);

	const [resultCurrency, setResultCurrency] = useState(0);
	const codeFromCurrency = fromCurrency.split("")[1];
	const codeToCurrency = toCurrency.split("")[1];

	console.log(resultCurrency);

	useEffect(() => {
		if (firstAmount) {
			axios.get("https://api.freecurrencyapi.com/v1/latest", {
				params: {
					apikey: "HLwItm4OQSm4jSjofNkYFMvBd9K8dsgfLhUvMl62",
					base_currency: codeFromCurrency,
					currencies: codeToCurrency,
				},
			})
				.then((response) =>
					setResultCurrency(response.data.data[codeToCurrency])
				)
				.catch((error) => console.log(error));
		}
	}, [firstAmount]);
	
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
					label="From"
				/>
				<SwitchCurrency />
				<SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
			</Grid>

			{firstAmount ? (
				<Box sx={{textAlign: "left", marginTop: "2rem"}}>
					<Typography >{firstAmount} 	{fromCurrency} = </Typography>
					<Typography>{resultCurrency} {toCurrency} </Typography>
				</Box>
			) : ""}
		</Container>
	);
}

export default App;
