import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { CgMenuLeft } from "react-icons/cg";
import { RiListSettingsFill } from "react-icons/ri";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import PropertyItem from "../components/PropertyItem";
import FilterOptions from "../components/FilterOptions";

const Search = () => {
  const [openList, setOpenList] = useState(false);
  const [openAdvanced, setOpenAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const saleRef = useRef();
  const rentRef = useRef();
  const allRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    type: "",
    parking: "",
    furnished: "",
    offer: "",
    sortBy: "created_at",
    order: "desc",
    bedrooms: "",
    bathrooms: "",
    airConditioning: "",
  });

  const handleChange = (e) => {
    const { name, value, type, id, checked } = e.target;
    const sort = value.split("_")[0] || "created_at";
    const order = value.split("_")[1] || "desc";
    if (id === "sort_order") {
      setSearchData((prevData) => ({
        ...prevData,
        sortBy: sort,
        order: order,
      }));
    }
    setSearchData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? id || checked : value,
    }));
    if (id === "sort_order") {
      setSearchParams((prevParams) => {
        prevParams.set("order", order);
        prevParams.set("sortBy", sort);

        return prevParams;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sp = new URLSearchParams(searchParams);
    if (searchData.bathrooms === "") {
      sp.delete("bathrooms");
    } else {
      sp.set("bathrooms", searchData.bathrooms);
    }
    if (searchData.bedrooms === "") {
      sp.delete("bedrooms");
    } else {
      sp.set("bedrooms", searchData.bedrooms);
    }
    sp.set("searchTerm", searchData.searchTerm);

    if (searchData.offer === "") {
      sp.delete("offer");
    } else {
      sp.set("offer", searchData.offer);
    }
    if (searchData.furnished === "") {
      sp.delete("furnished");
    } else {
      sp.set("furnished", searchData.furnished);
    }
    if (searchData.parking === "") {
      sp.delete("parking");
    } else {
      sp.set("parking", searchData.parking);
    }
    if (searchData.airConditioning === "") {
      sp.delete("airConditioning");
    } else {
      sp.set("airConditioning", searchData.airConditioning);
    }

    sp.set("sortBy", searchData.sortBy);
    sp.set("order", searchData.order);
    sp.set("type", searchData.type);

    navigate(`/search?${sp}`);

    console.log("navigate");
  };
  const fetchListing = async () => {
    setLoading(true);
    setShowMore(false);
    try {
      const res = await fetch(`/api/listing/get?${searchParams.toString()}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListing(data);
      setShowFilter(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sortBy");
    const airConditioning = urlParams.get("airConditioning");
    const bathrooms = urlParams.get("bathrooms");
    const bedrooms = urlParams.get("bedrooms");
    const orderFromUrl = urlParams.get("order");

    setSearchData({
      searchTerm: searchTermFromUrl || "",
      type: typeFromUrl || "all",
      parking: parkingFromUrl === "true" || "",
      furnished: furnishedFromUrl === "true" || "",
      airConditioning: airConditioning === "true" || "",
      bathrooms: bathrooms || "",
      bedrooms: bedrooms || "",
      sortBy: sortFromUrl || "created_at",
      order: orderFromUrl || "desc",
      offer: offerFromUrl === "true" || "",
    });

    fetchListing();
  }, [searchParams.toString()]);

  const onShowMoreClick = async () => {
    const numberOfListings = listing.length;
    const startIndex = numberOfListings;
    // searchParams.set("startIndex", startIndex);
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListing((prev) => [...prev, ...data]);
  };

  return (
    <div className="flex flex-col   max-sm:w-screen w-full pt-10 bg-[#f7f8f9] min-h-screen  ">
      <div className="flex flex-col w-full max-w-6xl mx-auto mb-3  ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full  max-lg:px-5 max-sm:gap-10 gap-24 "
        >
          <div className="flex justify-between items-center lg:hidden md:visible">
            <span className="font-semibold text-xl">
              Homes for{" "}
              <span className="capitalize">
                {searchData.type === "all" ? "Sale or Rent" : searchData.type}
              </span>
            </span>
            <button
              className="flex  xl:hidden w-20 h-10 items-center justify-center hover:text-[#FF385C]
               rounded-full shadow-lg bg-white self-end gap-2 text-[#726C73] font-semibold group "
              onClick={() => setShowFilter((prev) => !prev)}
            >
              <RiListSettingsFill />
              Filter
            </button>
          </div>
          {showFilter && (
            <FilterOptions
              searchData={searchData}
              handleChange={handleChange}
              setShowFilter={setShowFilter}
              showFilter={showFilter}
              allRef={allRef}
              saleRef={saleRef}
              rentRef={rentRef}
              openAdvanced={openAdvanced}
              setOpenAdvanced={setOpenAdvanced}
            />
          )}
          <div className="flex flex-wrap  relative z-10 gap-10 lg:visible max-lg:hidden">
            <input
              type="text"
              placeholder="Enter Keyword..."
              className="p-3 outline-none rounded-lg border h-fit
             text-[#726C73] placeholder:text-[#726C73] w-96   "
              name="searchTerm"
              value={searchData.searchTerm}
              onChange={handleChange}
            />

            <div className="flex flex-col gap-2 w-fit">
              <div
                className="flex bg-white items-center border text-[#726C73]  rounded-lg p-3 
                w-64 justify-between h-fit "
                onClick={() => {
                  setOpenList((prev) => !prev);
                  setOpenAdvanced(false);
                }}
              >
                {searchData.type === "all" ? "All Types" : searchData.type}
                <IoIosArrowDown className="text-[#9A9A9A] text-lg" />
              </div>
              {openList && (
                <div
                  className="flex flex-col border rounded-md text-[#7E83A0] bg-white 
                absolute z-10 mt-14  w-64 "
                >
                  <span
                    className="flex w-full h-full p-2 gap-2 
                  hover:bg-[#238AC1] hover:text-white  
                  checked:bg-[#238AC1] checked:text-white cursor-pointer"
                    onClick={() => {
                      allRef.current.click();
                      setOpenList(false);
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
                      setOpenList(false);
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
                      setOpenList(false);
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
              )}
            </div>
            <div
              className=" bg-white items-center border text-[#726C73]  rounded-lg p-3
              w-52 justify-between h-fit whitespace-nowrap flex group group-hover"
              onClick={() => {
                setOpenAdvanced((prev) => !prev);
                setOpenList(false);
              }}
            >
              Advanced Search
              <CiMenuKebab className="text-[#FF385C] text-lg" />
            </div>
            <button
              className="bg-[#FF385C] text-white rounded-md font-bold px-10 py-3 
               h-fit whitespace-nowrap "
            >
              Search Now
            </button>
          </div>
          <div
            className={`flex flex-col border rounded-md text-[#7E83A0] bg-white p-6 gap-5
                 mt-14 absolute z-10 w-3/4 
                ${
                  openAdvanced
                    ? "transform scale-100   transition-all  duration-500 ease-linear "
                    : "transform scale-0  transition-all  duration-500 ease-out"
                }
                `}
          >
            {openAdvanced && (
              <>
                <div className="flex gap-4 w-full ">
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
                      required
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
                      required
                      onChange={handleChange}
                      value={searchData.bathrooms}
                    />
                  </div>
                </div>
                <div className="flex gap-10 items-center">
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
              </>
            )}
          </div>
          <div className="flex gap-2 items-center h-fit justify-between ">
            <div className="flex h-fit font-bold text-[#676666]  max-sm:hidden ">
              {listing.length} Search results
            </div>

            <div className="flex gap-3 max-sm:w-full max-sm:justify-between">
              <div className="flex gap-2 text-[#495057] font-semibold ">
                <CgMenuLeft size={"1.4rem"} />
                <label> SORTBY:</label>
              </div>
              <select
                className="flex flex-col outline-none max-sm:px-1 px-3 bg-transparent  text-[#726C73]"
                onChange={handleChange}
                defaultValue={"created_at_desc"}
                id="sort_order"
              >
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to hight</option>
              </select>
            </div>
          </div>
        </form>
        <div className="flex flex-col h-full">
          <>
            {loading ? (
              <Loading />
            ) : (
              <div className="flex flex-wrap gap-5 max-sm:px-5 w-full justify-center  ">
                {listing.length > 0 && !loading ? (
                  listing.map((property) => (
                    <PropertyItem key={property._id} property={property} />
                  ))
                ) : (
                  <div className="flex justify-center items-center p-10 w-full text-2xl">
                    No Property Found
                  </div>
                )}
              </div>
            )}
          </>

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="bg-[#FF385C] text-white rounded-md font-bold px-10 py-3 w-fit self-center 
              hover:bg-black transition-all  ease-in delay-0 duration-300 mt-3 mb-3  "
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
