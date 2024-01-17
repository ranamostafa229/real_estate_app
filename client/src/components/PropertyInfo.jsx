/* eslint-disable react/prop-types */
import { LiaBedSolid } from "react-icons/lia";
import { LuBath } from "react-icons/lu";
import { GiHomeGarage } from "react-icons/gi";
import { TbSofa } from "react-icons/tb";
import { GiResize } from "react-icons/gi";
import { MdAir } from "react-icons/md";
import ContactOwner from "./ContactOwner";
import { useSelector } from "react-redux";

const PropertyInfo = ({ property }) => {
  const info = [
    {
      icon: <LiaBedSolid />,
      title: "Bedroom",
      info: property.bedrooms,
    },
    {
      icon: <LuBath />,
      title: "Bathroom",
      info: property.bathrooms,
    },
    {
      icon: <GiHomeGarage />,
      title: "Parking",
      info: property.parking ? "Yes" : "No",
    },
    {
      icon: <TbSofa />,
      title: "Furnished",
      info: property.furnished ? "Yes" : "No",
    },
    {
      icon: <MdAir />,
      title: "Air Conditioning",
      info: property.airConditioning ? "Yes" : "No",
    },
    {
      icon: <GiResize />,
      title: "Sqft",
      info: property.area,
    },
  ];
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-sm:flex-col flex  gap-10 max-w-6xl pb-10">
      <div className="flex flex-col gap-10 flex-1">
        <div className="flex flex-col bg-white shadow-lg p-5 gap-5">
          <h1 className="text-xl font-semibold">
            Overview
            <hr className="w-12  border-2 mt-2 border-[#FF385C]" />
          </h1>
          <div
            className={` items-center w-full grid max-sm:grid-cols-1 grid-cols-3  ${
              currentUser && property.userRef !== currentUser?._id
                ? "  gap-6"
                : " gap-16"
            } `}
          >
            {info.map((item) => (
              <div className="flex  items-center gap-2" key={item.title}>
                <div
                  className="border border-gray-300 p-3 rounded-md 
                text-[#FF385C] text-[1.5rem]  shadow-xl"
                >
                  {item.icon}
                </div>
                <div className="flex flex-col ">
                  <span className="font-semibold">{item.title}</span>{" "}
                  <span className="text-[#686E75]">{item.info}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-white shadow-lg p-5 gap-5 ">
          <h1 className="text-xl font-semibold">
            Property Description
            <hr className="w-12  border-2 mt-2 border-[#FF385C]" />
          </h1>
          <p className="text-[#766F82]">{property.description}</p>
        </div>
        <div className="flex flex-col bg-white shadow-lg p-5 gap-5 mb-5">
          <h1 className="text-xl font-semibold">
            Location
            <hr className="w-12  border-2 mt-2 border-[#FF385C]" />
          </h1>
          <div>
            <span className="font-semibold">Address: </span>
            <span className="text-[#766F82] capitalize">
              {property.address}
            </span>
          </div>

          <div>
            <span className="font-semibold">Country: </span>
            <span className="text-[#766F82] capitalize">
              {property.country}
            </span>
          </div>
          <div>
            <span className="font-semibold">City: </span>
            <span className="text-[#766F82] capitalize">{property.city}</span>
          </div>
        </div>
      </div>
      {/* contact owner */}
      <ContactOwner property={property} />
    </div>
  );
};

export default PropertyInfo;
