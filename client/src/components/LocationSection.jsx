/* eslint-disable react/prop-types */
const LocationSection = ({ handleChange, formData }) => {
  return (
    <div className="flex flex-col gap-5 ">
      <div className="flex flex-col gap-2">
        <span className="font-medium">Address</span>
        <input
          type="text"
          name="address"
          placeholder="Enter Your Address"
          className="outline outline-1 outline-[#DDDDDD] p-2"
          onChange={handleChange}
          value={formData.address}
          required
        />
      </div>
      <div className="max-lg:flex-col flex justify-between items-center">
        <div className="flex flex-col gap-3 w-full">
          <span className="font-medium">Country</span>
          <div
            className="flex items-center justify-between border p-3
            text-[#B3AAA1]  rounded-md max-lg:w-full  w-[400px] h-fit cursor-pointer "
          >
            <input
              type="text"
              placeholder="Country"
              name="country"
              className="outline-none"
              onChange={handleChange}
              value={formData.country}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="font-medium">City</span>
          <div
            className="flex items-center justify-between border p-3
            text-[#B3AAA1]  rounded-md  max-lg:w-full  w-[400px] h-fit cursor-pointer "
          >
            <input
              type="text"
              placeholder="City"
              name="city"
              className="outline-none"
              onChange={handleChange}
              value={formData.city}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
