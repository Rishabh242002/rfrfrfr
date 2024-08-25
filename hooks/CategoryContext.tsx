import React, { createContext, useContext, useState, ReactNode } from "react";

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryContext = createContext<{
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export const CategoryProvider: React.FC<CategoryProviderProps> = ({
  children,
}) => {
  const [category, setCategory] = useState("scientific"); // Default or fetched category

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
