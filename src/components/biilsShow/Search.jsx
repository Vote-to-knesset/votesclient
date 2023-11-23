import { useSearchTerm } from "../../../atoms/atomBills";

function Search() {
  const [searchTerm,setSearchTerm] = useSearchTerm()

  return (
    <div dir="rtl">
      <form className="relative" >
        <label
          for="default-search"
          className="text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <button
            type="submit"
            className="text-white absolute top-2 left-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
          >
            חפש
          </button>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-14 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="חיפוש..."
            value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
          />
        </div>
      </form>
    </div>
  );
}

export default Search;
