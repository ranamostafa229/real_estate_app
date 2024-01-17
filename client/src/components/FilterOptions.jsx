import { AiOutlineClose } from "react-icons/ai";
import { FaBath, FaBed } from "react-icons/fa";

/* eslint-disable react/prop-types */
const FilterOptions = ({
  searchData,
  handleChange,
  setShowFilter,
  showFilter,
  allRef,
  saleRef,
  rentRef,
}) => {
  return (
    <>
      <div
        className={` bg-black/80 fixed w-full h-full z-50 top-0 left-0 `}
      ></div>

      <div
        className={`flex flex-col ${
          showFilter
            ? "fixed top-0 left-0 w-[300px]   duration-500   z-50 "
            : "fixed top-0 left-[-100%] w-[300px] z-10  duration-500 "
        } gap-5 bg-white  h-full p-6 overflow-y-scroll `}
      >
        <div className="flex w-full justify-between items-center">
          <span className="font-semibold text-2xl">Listing Filter</span>
          <AiOutlineClose
            onClick={() => setShowFilter((prev) => !prev)}
            size={25}
            className=" right-4 top-4 cursor-pointer "
          />
        </div>
        <div className="flex flex-col w-full  gap-2 pt-4">
          <span className="font-semibold ">Find your home</span>

          <input
            type="text"
            placeholder="Enter Keyword..."
            className="p-3 outline-none rounded-lg border h-fit
           text-[#726C73] placeholder:text-[#726C73] w-fit   "
            name="searchTerm"
            value={searchData.searchTerm}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2 w-fit">
          <span className="font-semibold ">Property Type</span>

          <div
            className="flex flex-col border rounded-md text-[#7E83A0] bg-white 
              w-64 "
          >
            <span
              className="flex w-full h-full p-2 gap-2 
           hover:bg-[#238AC1] hover:text-white  
           checked:bg-[#238AC1] checked:text-white cursor-pointer"
              onClick={() => {
                allRef.current.click();
              }}
            >
              <input
                type="checkbox"
                name="type"
                id="all"
                onChange={handleChange}
                checked={searchData.type === "all"}
                className="hidden"
                ref={allRef}
              />
              <label htmlFor="type">All</label>
            </span>
            <span
              className="flex w-full h-full p-2 gap-2 
        hover:bg-[#238AC1] hover:text-white  
        checked:bg-[#238AC1] checked:text-white cursor-pointer"
              onClick={() => {
                rentRef.current.click();
              }}
            >
              <input
                type="checkbox"
                name="type"
                id="rent"
                onChange={handleChange}
                checked={searchData.type === "rent"}
                className="hidden"
                ref={rentRef}
              />
              <label htmlFor="type">For Rent</label>
            </span>
            <span
              className="flex w-full h-full p-2 gap-2
           hover:bg-[#238AC1] hover:text-white 
          checked:bg-[#238AC1] checked:text-white cursor-pointer"
              onClick={() => {
                saleRef.current.click();
              }}
            >
              <input
                type="checkbox"
                name="type"
                id="sale"
                onChange={handleChange}
                checked={searchData.type === "sale"}
                className="hidden"
                ref={saleRef}
              />
              <label htmlFor="type">For Sale</label>
            </span>
          </div>
        </div>
        <span className="font-semibold">Advanced Search</span>
        <div
          className={`flex flex-col border rounded-md text-[#7E83A0] bg-white p-6 gap-5
                 w-3/4 
              
                `}
        >
          <div className="flex flex-col gap-4 w-full">
            <div
              className="flex items-center gap-2 border p-3
                text-[#B3AAA1]  rounded-md  h-fit cursor-pointer  bg-white w-full "
            >
              <FaBed />
              <input
                type="number"
                placeholder="Bedrooms"
                name="bedrooms"
                className="outline-none w-32"
                min={"1"}
                max={"10"}
                onChange={handleChange}
                value={searchData.bedrooms}
              />
            </div>
            <div
              className="flex items-center  gap-2 border p-3
                text-[#B3AAA1]  rounded-md  h-fit cursor-pointer bg-white w-full"
            >
              <FaBath />
              <input
                type="number"
                placeholder="Bathrooms"
                name="bathrooms"
                className="outline-none w-36"
                min={"1"}
                max={"10"}
                onChange={handleChange}
                value={searchData.bathrooms}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-10">
            <span className="text-[#FF385C] font-semibold text-lg">
              Other Features:
            </span>

            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                className="w-4 accent-[#FF385C]"
                onChange={handleChange}
                checked={searchData.parking}
              />
              <span>Parking spot</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                className="w-4 accent-[#FF385C] "
                onChange={handleChange}
                checked={searchData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="airConditioning"
                className="w-4 accent-[#FF385C] "
                onChange={handleChange}
                checked={searchData.airConditioning}
              />
              <span> Air Conditioning</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="offer"
                className="w-4 accent-[#FF385C] "
                onChange={handleChange}
                checked={searchData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
        </div>
        <button
          className="bg-[#FF385C] text-white rounded-md font-bold px-10 py-3 
          h-fit whitespace-nowrap "
        >
          Search Now
        </button>
      </div>
    </>
  );
};

export default FilterOptions;
