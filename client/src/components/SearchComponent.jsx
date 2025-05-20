import React, { useState, useContext, useEffect, useRef } from "react";
import { HiSearch } from "react-icons/hi";
import { SearchContext } from "../store/searchContext";
import { useAuth } from "../store/auth";

const SearchComponent = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { products } = useAuth();
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = products
        .map((p) => p.name)
        .filter((name) =>
          name.toLowerCase().includes(value.toLowerCase())
        );
      setSuggestions(filtered);
      setIsDropdownOpen(true);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setIsDropdownOpen(false);
    setSuggestions([]);
    document.activeElement.blur(); // blur input
  };

  return (
    <nav className="bg-black px-6 py-4 shadow-md border border-white/20">
      <div className="flex items-center justify-center  gap-10">
        <div className="text-white text-2xl font-bold">ElectroEra</div>
        <div
          className="relative flex-grow max-w-xl w-full"
          ref={wrapperRef}
        >
          <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => {
              if (suggestions.length > 0) setIsDropdownOpen(true);
            }}
            placeholder="Search for products..."
            className="w-full p-3 pl-4 pr-12 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 shadow-sm"
          />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
                <HiSearch className="h-5 w-5" />
              </button>

          </div>
          {isDropdownOpen && suggestions.length > 0 && (
             <div className="absolute left-0 right-0 z-30 bg-gray-900 border-t border-gray-700 shadow-lg max-h-64 overflow-y-auto">
            <ul className="max-w-4xl mx-auto px-4">
              {suggestions.map((suggestion, index) => {
                const matchIndex = suggestion
                  .toLowerCase()
                  .indexOf(searchTerm.toLowerCase());
                const beforeMatch = suggestion.substring(0, matchIndex);
                const matchText = suggestion.substring(
                  matchIndex,
                  matchIndex + searchTerm.length
                );
                const afterMatch = suggestion.substring(
                  matchIndex + searchTerm.length
                );

                return (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-3 text-white cursor-pointer hover:bg-fuchsia-700 transition duration-200 rounded"
                  >
                    {beforeMatch}
                    <span className="text-fuchsia-400 font-medium">
                      {matchText}
                    </span>
                    {afterMatch}
                  </li>
                );
              })}
            </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default SearchComponent;

