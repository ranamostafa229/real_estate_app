import { useEffect, useState } from "react";
import Loader from "../assets/preloader.gif";
import { useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import PropertyInfo from "../components/PropertyInfo";
import Slider from "../components/Slider";
import { FaLocationDot } from "react-icons/fa6";

const Property = () => {
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const price = (property.regularPrice - property.discountPrice).toLocaleString(
    "en-US"
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/listing/get/${id}`);
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }
      console.log(data);
      setProperty(data);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(property);

  return (
    <div className="flex flex-col  w-full ">
      {loading ? (
        <div className="flex flex-col justify-center self-center min-h-screen ">
          <img src={Loader} alt="loader" />
        </div>
      ) : (
        <div
          className={`flex flex-col  ${
            error ? "bg-white" : "bg-[#F5F7FB]"
          }  min-h-screen max-sm:w-screen`}
        >
          {error ? (
            <NotFound />
          ) : (
            <div className="flex flex-col w-full max-w-5xl mx-auto px-5 gap-10">
              <div className="flex flex-col gap-3 pt-10 ">
                <div className="flex items-center justify-between">
                  <div className="max-sm:flex-col max-sm:items-start flex items-center gap-3 justify-center">
                    <h1 className="max-sm:text-xl text-4xl font-semibold ">
                      {property.name}
                    </h1>
                    <div className="bg-[#FF385C] text-white capitalize rounded-full mt-2 px-4 w-28 text-center ">
                      <span> For {property.type}</span>
                    </div>
                  </div>
                  <span className="text-[#FF385C] max-sm:text-2xl max-sm:self-end text-3xl font-semibold ">
                    ${price}
                  </span>
                </div>

                <span className="flex items-center justify-between w-full  text-[#686E75] font-medium">
                  <div className="flex items-center gap-1 max-sm:w-44">
                    <FaLocationDot />
                    {property.address}
                  </div>
                  {property.offer && (
                    <span>${property.discountPrice} discount</span>
                  )}
                </span>
              </div>
              <Slider property={property} />
              <PropertyInfo property={property} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Property;
