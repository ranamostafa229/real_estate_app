/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import PropertyItem from "./PropertyItem";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Title from "./Title";
const SaleSection = ({ saleList }) => {
  return (
    <div className="flex flex-col p-10">
      <Title
        word1={"PROPERTIES"}
        word2={"FOR SALE"}
        word3={"Find your dream home from our Sale added properties."}
      />
      <div className="flex flex-wrap gap-5 p-5 max-w-7xl justify-center  mx-auto">
        {saleList.map((property) => (
          <PropertyItem key={property._id} property={property} />
        ))}
      </div>
      <Link to={"/search?type=sale"} className="self-center ">
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

export default SaleSection;
