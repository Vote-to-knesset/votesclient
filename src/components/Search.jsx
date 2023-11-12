import * as React from "react";
import { useState } from "react";

function Search({ onSearch }) {
  const [isSearchOpen, setSearchOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
};

  return (
    <div dir="rtl">
      <form class="relative" onSubmit={handleSubmit}>
        <label
          for="default-search"
          class="text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <button
            type="submit"
            class="text-white absolute top-2 left-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
          >
            חפש
          </button>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-14 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="חיפוש..."
            value={searchValue}
          onChange={handleInputChange}
          required
          />
        </div>
      </form>
    </div>
  );
}

export default Search;
