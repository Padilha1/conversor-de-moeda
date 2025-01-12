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

  const dataFilterArray = data as unknown as Array<any>;
  const dataFilter = dataFilterArray!.filter(
    (item: any) => "currencies" in item
  );
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
        sx={{
          "& .MuiInputBase-root": {
            color: "white", // Cor do texto selecionado
          },
          "& .MuiInputLabel-root": {
            color: "gray", // Cor do label
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "gray", // Borda padrão
            },
            "&:hover fieldset": {
              borderColor: "white", // Borda ao passar o mouse
            },
            "&.Mui-focused fieldset": {
              borderColor: "white", // Borda ao focar
            },
          },
          "& .MuiSvgIcon-root": {
            color: "white", // Ícone da seta (dropdown)
          },
          "& .MuiAutocomplete-popupIndicator": {
            color: "white", // Ícone de expandir dropdown
          },
          "& .MuiAutocomplete-clearIndicator": {
            color: "white", // Ícone de limpar (se habilitado)
          },
          "& .MuiAutocomplete-option": {
            color: "black", // Cor das opções no dropdown
            backgroundColor: "white", // Fundo das opções
            "&:hover": {
              backgroundColor: "gray", // Fundo no hover
              color: "white",
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputLabelProps={{
              sx: {
                color: "gray", // Cor do label
                "&.Mui-focused": {
                  color: "white", // Cor do label quando focado
                },
              },
            }}
            InputProps={{
              ...params.InputProps,
              sx: {
                color: "white", // Cor do texto digitado
              },
            }}
          />
        )}
      />
    </Grid>
  );
};

export default SelectCountry;
