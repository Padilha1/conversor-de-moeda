import { createContext, useState, useContext, ReactNode } from "react";

// Definição do tipo do contexto
type ContextCurrency = {
  fromCurrency: string;
  setFromCurrency: React.Dispatch<React.SetStateAction<string>>;
  toCurrency: string;
  setToCurrency: React.Dispatch<React.SetStateAction<string>>;
  firstAmount: string;
  setFirstAmount: React.Dispatch<React.SetStateAction<string>>;
};

// Criação do Contexto com valor inicial como undefined
export const CurrencyContext = createContext<ContextCurrency | undefined>(
  undefined
);

// Definição do tipo para as props do Provider
type CurrencyProviderProps = {
  children: ReactNode;
};

// Componente Provider
const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const [fromCurrency, setFromCurrency] = useState("🇧🇷 BRL - Brazil");
  const [toCurrency, setToCurrency] = useState("🇺🇸 USD - United States");
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

// Hook customizado para usar o Contexto com segurança
export const useCurrency = (): ContextCurrency => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency deve ser usado dentro de um CurrencyProvider");
  }
  return context;
};
