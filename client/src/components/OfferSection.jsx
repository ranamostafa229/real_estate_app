/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import bg from "../assets/bg-info.jpg";
import PropertyItem from "./PropertyItem";
import { FaArrowAltCircleRight } from "react-icons/fa";
const OfferSection = ({ offerList }) => {
  return (
    <div
      className="flex flex-col  relative  justify-center 
    items-center overflow-x-hidden h-[1220px] "
    >
      <img
        src={bg}
        alt=""
        className="flex w-full h-full scale-x-150 bg-cover "
      />
      <div className="flex absolute  h-full  w-full bg-black opacity-50 filter  z-10  " />

      <div
        className="flex flex-wrap gap-5 h-fit w-full items-center  justify-center
        absolute z-10  max-sm:p-5 "
      >
        <div className="flex flex-col   gap-5 justify-center text-white  ">
          <h1 className="font-semibold text-4xl">Special Offers.</h1>
          <span className="leading-10  w-80">
            We Help you find the best places and offer near you. Bring to the
            table win-win survival strategies to ensure proactive domination
            going forward.
          </span>
          <Link to={"/search?offer=true"} className=" ">
            <button
              className=" bg-[#FF385C] rounded-full px-7 py-3
       hover:bg-black text-white text-lg transition-all  ease-in delay-0 duration-300 group"
            >
              <span className="flex items-center gap-1">
                {" "}
                View All
                <FaArrowAltCircleRight className="group-hover:translate-x-2 text-sm transition-all" />
              </span>
            </button>
          </Link>
        </div>
        {offerList.map((property) => (
          <PropertyItem key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default OfferSection;
