import { useEffect, useState } from "react";
import DescriptionSection from "../components/DescriptionSection";
import MediaSection from "../components/MediaSection";
import LocationSection from "../components/LocationSection";
import DetailsSection from "../components/DetailsSection";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const EditProperty = () => {
  const [section, setSection] = useState("Description");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    city: "",
    country: "",
    type: "",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    area: 50,
    offer: false,
    parking: false,
    furnished: false,
  });
  console.log(formData);
  const handleChange = (e) => {
    const { name, value, type, id, checked } = e.target;
    setFormData({
      ...formData,

      [name]: type === "checkbox" ? id || checked : value,
    });
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");

      setLoading(true);
      setError(false);

      const res = await fetch(`/api/listing/update/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        console.log(data.message);
      }
      navigate(`/property/${data._id}`);
    } catch (error) {
      setError(error);
      console.log(error);

      setLoading(false);
    }
  };
  const fetchListing = async () => {
    const listingId = params.id;
    const res = await fetch(`/api/listing/get/${listingId}`);
    const data = await res.json();
    if (data.success === false) {
      console.log(data.message);
      return;
    }
    console.log(data);

    setFormData(data);
  };

  useEffect(() => {
    fetchListing();
  }, []);
  useEffect(() => {
    if (formData.offer === false) {
      setFormData({
        ...formData,
        discountPrice: 0,
      });
    }
  }, [formData.offer]);

  return (
    <div className=" flex flex-col h-screen  bg-[#f7f8f9] max-xl:px-5 max-sm:w-screen ">
      <form onSubmit={handleSumbit}>
        <div
          className="flex flex-col justify-center 
          w-full max-w-4xl  mx-auto mt-10   bg-white"
        >
          <div className="flex max-sm:gap-0  gap-5 bg-[#F2F2F2]  ">
            <div
              onClick={() => setSection("Description")}
              className={`flex cursor-pointer h-fit font-semibold ${
                section === "Description" && "bg-white text-[#FF385C]"
              }`}
            >
              <span className="p-3">1. Description</span>
            </div>
            <div
              onClick={() => setSection("Media")}
              className={`flex cursor-pointer h-fit font-semibold ${
                section === "Media" && "bg-white text-[#FF385C]"
              }`}
            >
              <span className="p-3"> 2. Media</span>
            </div>
            <div
              onClick={() => setSection("Location")}
              className={`flex cursor-pointer h-fit font-semibold ${
                section === "Location" && "bg-white text-[#FF385C]"
              }`}
            >
              <span className="p-3">3. Location</span>
            </div>
            <div
              onClick={() => setSection("Details")}
              className={`flex cursor-pointer h-fit font-semibold ${
                section === "Details" && "bg-white text-[#FF385C]"
              }`}
            >
              <span className="p-3">4. Details</span>
            </div>
          </div>

          {section === "Description" && (
            <div className="p-10 ">
              <DescriptionSection
                handleChange={handleChange}
                formData={formData}
              />
            </div>
          )}
          {section === "Media" && (
            <div className="p-10">
              {" "}
              <MediaSection
                setFormData={setFormData}
                formData={formData}
                imageUrls={formData.imageUrls}
              />
            </div>
          )}
          {section === "Location" && (
            <div className="p-10 ">
              <LocationSection
                handleChange={handleChange}
                formData={formData}
              />
            </div>
          )}
          {section === "Details" && (
            <div className="p-10 ">
              <DetailsSection
                handleChange={handleChange}
                formData={formData}
                loading={loading}
                error={error}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProperty;
