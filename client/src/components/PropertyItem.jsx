import { Link } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { LiaBedSolid } from "react-icons/lia";
import { FaShower } from "react-icons/fa";
import { GiResize } from "react-icons/gi";
import { FaDollarSign } from "react-icons/fa6";
import { ImPower } from "react-icons/im";
import Arrow from "../assets/arrow.svg";
/* eslint-disable react/prop-types */
const PropertyItem = ({ property }) => {
  const price = (property.regularPrice - property.discountPrice).toLocaleString(
    "en-US"
  );
  console.log(property.offer);
  return (
    <div
      className="bg-white shadow-md group hover:shadow-xl transition-all duration-300
      sm:w-[370px] w-full  rounded-lg mt-10  h-fit "
    >
      <Link to={`/property/${property._id}`}>
        <div className="flex relative   overflow-hidden ">
          <img
            src={property.imageUrls[0]}
            alt="cover"
            className="h-[220px] sm:h-[120] w-full object-cover
              group-hover:scale-110 transition-all transform duration-300  ease-in"
          />
          <div className=" flex flex-col absolute z-10 top-0  px-6 text-lg  text-[#F73659] ">
            <img src={Arrow} alt="" />
          </div>
          {property.offer && (
            <div
              className="absolute z-10 top-0 text-white font-semibold capitalize
         bg-[#F73659] px-2 py-1  rounded-sm clip w-10 h-10"
            >
              <ImPower />
            </div>
          )}
          <div
            className="absolute z-0 top-0 text-white font-semibold capitalize
           bg-[#F73659] px-2 py-1 ml-3 mt-8 rounded-sm"
          >
            For {property.type}
          </div>
          <span className="flex items-center absolute z-10 bottom-0 text-white font-bold text-2xl p-3">
            <FaDollarSign size={"1.2rem"} /> {price}{" "}
            <span className="text-slate-200 ont-semibold text-xl">
              {property.type === "rent" ? " /mo" : ""}
            </span>
          </span>
        </div>
        <div className="flex flex-col p-3 gap-4">
          <h1 className="md:truncate text-[#444F66] text-xl font-semibold capitalize">
            {property.name}
          </h1>
          <div className="flex items-center gap-2 text-[#666666]">
            <MdLocationPin />
            {property.address}
          </div>
          <div className="flex justify-between p-1">
            <span className="flex items-center gap-2">
              <div className="bg-[#F73659] bg-opacity-10 rounded-full p-2 ">
                <LiaBedSolid className="text-[#F73659]" />
              </div>
              <span className="text-[#666B75] font-medium">
                {property.bedrooms} Beds
              </span>
            </span>
            <span className="flex items-center gap-2">
              <div className="bg-[#F73659] bg-opacity-10 rounded-full p-2">
                <FaShower className="text-[#F73659]" />
              </div>
              <span className="text-[#666B75] font-medium">
                {property.bathrooms} Bahts
              </span>
            </span>
            <span className="flex items-center gap-2">
              <div className="bg-[#F73659] bg-opacity-10 rounded-full p-2">
                <GiResize className="text-[#F73659]" />
              </div>
              <span className="text-[#666B75] font-medium">
                {property.area} Sqft
              </span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyItem;
