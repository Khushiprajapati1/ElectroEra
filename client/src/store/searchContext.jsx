import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => setIsSearchOpen(prev => !prev);

  return (
    <SearchContext.Provider value={{
      searchTerm,
      setSearchTerm,
      isSearchOpen,
      toggleSearch
    }}>
      {children}
    </SearchContext.Provider>
  );
};
