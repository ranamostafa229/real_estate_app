/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

// eslint-disable-next-line react/prop-types
const DescriptionSection = ({ handleChange, formData }) => {
  const [openList, setOpenList] = useState(false);
  const saleRef = useRef();
  const rentRef = useRef();
  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex flex-col gap-2">
        <span className="font-medium">Property Title</span>
        <input
          type="text"
          name="name"
          maxLength="60"
          minLength="10"
          placeholder="Enter your property title"
          className="outline outline-1 outline-[#DDDDDD] p-2"
          required
          onChange={handleChange}
          value={formData.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">Property Description</span>
        <textarea
          type="text"
          name="description"
          placeholder="Describe about your property "
          className="outline outline-1 outline-[#DDDDDD] p-3 bg-[#F8F8F8] rounded-sm"
          required
          onChange={handleChange}
          value={formData.description}
        />
      </div>

      <div className="flex flex-wrap justify-between w-full gap-3">
        <div className="flex flex-col gap-1">
          <div
            className="flex items-center justify-between border p-3
            text-[#B3AAA1]  rounded-md cursor-pointer max-sm:w-64 w-72 "
            onClick={() => setOpenList((prev) => !prev)}
          >
            <span>{formData.type ? `For ${formData.type}` : "Listing in"}</span>
            <RiArrowDropDownLine size={"1.7rem"} />
          </div>
          {openList && (
            <div className="flex flex-col border rounded-md text-[#7E83A0] max-sm:w-64   w-72 ">
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
                  checked={formData.type === "rent"}
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
                  checked={formData.type === "sale"}
                  className="hidden"
                  ref={saleRef}
                />
                <label htmlFor="type">For Sale</label>
              </span>
            </div>
          )}
        </div>
        <div
          className="flex items-center justify-between border p-3
         text-[#B3AAA1]  rounded-md  h-fit cursor-pointer  w-72"
        >
          <input
            type="number"
            placeholder="Rooms"
            name="bedrooms"
            className="outline-none w-full"
            min={"1"}
            max={"10"}
            required
            onChange={handleChange}
            value={formData.bedrooms}
          />
        </div>
        <div
          className="flex items-center justify-between border p-3
         text-[#B3AAA1]  rounded-md  h-fit cursor-pointer w-72  "
        >
          <input
            type="number"
            placeholder="Baths"
            name="bathrooms"
            className="outline-none w-full"
            min={"1"}
            max={"10"}
            required
            onChange={handleChange}
            value={formData.bathrooms}
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
