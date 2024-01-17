/* eslint-disable react/prop-types */
const DetailsSection = ({ handleChange, formData, loading, error }) => {
  return (
    <div className="flex flex-col  gap-7">
      <h1 className="text-[#FF385C] font-semibold text-lg">Select Features:</h1>

      <div className=" flex flex-wrap gap-10">
        <div className="flex gap-2">
          <input
            type="checkbox"
            name="parking"
            className="w-4 accent-[#FF385C]"
            onChange={handleChange}
            checked={formData.parking}
          />
          <span>Parking spot</span>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            name="furnished"
            className="w-4 accent-[#FF385C] "
            onChange={handleChange}
            checked={formData.furnished}
          />
          <span>Furnished</span>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            name="airConditioning"
            className="w-4 accent-[#FF385C] "
            onChange={handleChange}
            checked={formData.airConditioning}
          />
          <span>Air Conditioning</span>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            name="offer"
            className="w-4 accent-[#FF385C] "
            onChange={handleChange}
            checked={formData.offer}
          />
          <span>Offer</span>
        </div>
      </div>

      <div className="max-lg:flex-col flex justify-between items-center gap-2">
        <div className="flex flex-col gap-3 w-full">
          <span className="font-medium">Price</span>
          <div
            className="flex items-center justify-between border p-3
            text-[#B3AAA1]  rounded-md  h-fit cursor-pointer "
          >
            <input
              type="number"
              placeholder="Price"
              name="regularPrice"
              className="outline-none w-full"
              min="50"
              max="10000000"
              required
              onChange={handleChange}
              value={formData.regularPrice}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <span className="font-medium">Area</span>
          <div
            className="flex items-center justify-between border p-3
            text-[#B3AAA1]  rounded-md  h-fit cursor-pointer"
          >
            <input
              type="number"
              placeholder="Sqft"
              name="area"
              className="outline-none w-full"
              required
              onChange={handleChange}
              value={formData.area}
            />
          </div>
        </div>
      </div>
      {formData.offer && (
        <div className="flex flex-col gap-2 w-full">
          <span className="font-medium">Discounted Price</span>
          <div
            className="flex items-center justify-between border p-3
           text-[#B3AAA1]  rounded-md max-sm:w-full w-1/2  h-fit cursor-pointer "
          >
            <input
              type="number"
              placeholder="Discount Price"
              name="discountPrice"
              className="outline-none w-full"
              min="10"
              max="10000000"
              required
              onChange={handleChange}
              value={formData.discountPrice}
            />
          </div>
        </div>
      )}
      <button
        disabled={loading}
        className="self-center bg-[#FF385C] hover:bg-black text-white p-3"
      >
        {loading ? "Loading..." : "Submit Proprety"}
      </button>
      {error && (
        <p className="text-red-500 font-semibold text-lg text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default DetailsSection;
