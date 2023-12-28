import { useSearchTerm, useBills } from "../../../atoms/atomBills";
import { useState } from "react"; // Import useState hook

function Search() {
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const [clickedSearchTerm, setClickedSearchTerm] = useState("");
  const [inputSearchTerm, setInputSearchTerm] = useState(""); // State to store input search term

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    } else {
      setClickedSearchTerm(e.target.value);
    }
  }

  function handleClickSearch() {
    setSearchTerm(inputSearchTerm);
    setClickedSearchTerm(inputSearchTerm);
  }

  return (
    <>
      <div dir="rtl">
        <div className="relative text-gray-600">
          <input
            type="search"
            name="search"
            placeholder="חפש הצעת חוק"
            className="bg-gray-300 h-10 px-4 md:px-12 pr-10 rounded-full text-sm focus:outline-none"
            onKeyDown={handleKeyPress}
            value={inputSearchTerm}
            onChange={(e) => setInputSearchTerm(e.target.value)}
            required
          />
          <button
            type="submit"
            className="absolute right-0 top-0 mt-3 mr-4"
            onClick={handleClickSearch}
          >
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              style={{ enableBackground: "new 0 0 56.966 56.966" }}
              xmlSpace="preserve"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>

        {clickedSearchTerm && (
          <div className=" absolute z-10 mt-4 bg-white  divide-gray-100 rounded-lg shadow w-50 dark:bg-gray-200">
            <div className="text-center">
              <div className="text-gray-800 cursor-pointer">
                תוצאות עבור: {clickedSearchTerm}
              </div>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleClickSearch(clickedSearchTerm)}
              >
                חפש את "{clickedSearchTerm}"
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Search;