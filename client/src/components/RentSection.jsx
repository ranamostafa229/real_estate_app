/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import PropertyItem from "./PropertyItem";
import { FaArrowAltCircleRight } from "react-icons/fa";
import bg from "../assets/bg-pattern-dot.png";
import Title from "./Title";

const RentSection = ({ rentList }) => {
  return (
    <div
      className="flex flex-col bg-repeat p-10 "
      style={{ background: `url(${bg})   ` }}
    >
      <Title
        word1={"PROPERTIES"}
        word2={"FOR RENT"}
        word3={"Find your dream home from our Rent added properties."}
      />

      <div className="flex flex-wrap gap-5 p-5 max-w-7xl  justify-center  mx-auto">
        {rentList.map((property) => (
          <PropertyItem key={property._id} property={property} />
        ))}
      </div>
      <Link to={"/search?type=rent"} className="self-center ">
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
  );
};

export default RentSection;
