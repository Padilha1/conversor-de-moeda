import { createContext, useState } from "react";

type ContextCurrency = {
	fromCurrency: string;
	setFromCurrency: React.Dispatch<React.SetStateAction<string>>;
	toCurrency: string;
	setToCurrency: React.Dispatch<React.SetStateAction<string>>;
	firstAmount: any;
	setFirstAmount: React.Dispatch<React.SetStateAction<string>>;
};

export const CurrencyContext = createContext<ContextCurrency>(
	{} as ContextCurrency
);

const CurrencyProvider = ({ children }: any) => {
	const [fromCurrency, setFromCurrency] = useState("π§π· BRL - Brazil");
	const [toCurrency, setToCurrency] = useState("πΊπΈ USD - United States");
	const [firstAmount, setFirstAmount] = useState("");

	const value = {
		fromCurrency,
		setFromCurrency,
		toCurrency,
		setToCurrency,
		firstAmount,
		setFirstAmount,
	};

	return (
		<CurrencyContext.Provider value={value}>
			{children}
		</CurrencyContext.Provider>
	);
};

export default CurrencyProvider;
