import { useEffect, useState } from "react";
import Background from "../assets/bg.jpg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="flex relative  ">
      <img
        src={Background}
        alt="Background"
        className="bg-cover  w-full h-screen"
      />
      <div
        className="flex flex-col 
       bg-black opacity-30 object-cover  w-full h-full absolute filter"
      />
      <div className="flex flex-col  w-full h-full  justify-center items-center absolute max-sm:gap-2 gap-10">
        <h1 className="flex text-white font-semibold   max-sm:text-3xl text-5xl max-sm:pt-10  ">
          Find Your Dream House
        </h1>
        <h2 className="text-white text-lg max-sm:text-sm ">
          We Have Over Million Properties For You.
        </h2>
        <div className="flex border-8 border-gray-300 border-opacity-25  rounded-xl   max-w-5xl w-full  ">
          <div
            className="flex bg-white  max-w-5xl mx-auto w-full rounded-md  
          border-2 border-[#ebebeb] "
          >
            <form
              onSubmit={handleSubmit}
              className="flex w-full justify-between"
            >
              <input
                type="text"
                placeholder="Enter Address,City,State "
                className="p-5 ml-2 outline-none  w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-[#FF385C] text-white rounded-md font-bold max-sm:px-2 px-10 m-2  w-52">
                Search Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
