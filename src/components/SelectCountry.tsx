import { Grid, Autocomplete, TextField, Skeleton } from "@mui/material";
import React from "react";
import useAxios from "../hooks/useAxios";

type CountryProp = {
	value: string;
	setValue: Function;
	label: string;
};

const SelectCountry = (props: CountryProp) => {
	const { value, setValue, label } = props;

	const [data, loaded, error] = useAxios("https://restcountries.com/v3.1/all");

	if (loaded) {
		return (
			<Grid item xs={12} md={3}>
				<Skeleton variant="rounded" height={60} />
			</Grid>
		);
	}

	// Pegando Data que estava 'unknown' e transformar em ARRAY para o FILTER não dar erro de conversão.
	const dataFilterArray = data as unknown as Array<any>;
	const dataFilter = dataFilterArray!.filter((item: any) => "currencies" in item);
	const dataCountries = dataFilter.map((item: any) => {
		return `${item.flag} ${Object.keys(item.currencies)[0]} - ${
			item.name.common
		}`;
	});

	return (
		<Grid item xs={12} md={3}>
			<Autocomplete
				value={value}
				disableClearable
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				options={dataCountries}
				renderInput={(params) => <TextField {...params} label={label} />}
				sx={{ color: "white" }}
			/>
		</Grid>
	);
};

export default SelectCountry;
