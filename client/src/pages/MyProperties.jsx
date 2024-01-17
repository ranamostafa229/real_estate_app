import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsFillHouseAddFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import {
  signOutUserFaliure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";

const MyProperties = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProperties, setUserProperties] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(error);
  const handleShowProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setUserProperties(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const handlePropertyDelete = async (propertyId) => {
    try {
      const res = await fetch(`/api/listing/delete/${propertyId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserProperties((prev) =>
        prev.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.message === false) {
        dispatch(signOutUserFaliure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFaliure(error.message));
    }
  };
  useEffect(() => {
    handleShowProperties();
  }, []);
  useEffect(() => {
    if (error === "Access denied") {
      handleSignOut();
    }
  }, [error]);

  return (
    <div className=" flex flex-col  bg-[#f7f8f9] min-h-screen  max-xl:px-5 max-sm:w-screen">
      {loading ? (
        <Loading />
      ) : (
        <>
          {userProperties && userProperties.length === 0 && (
            <div
              className="flex flex-col text-xl font-semibold bg-white
            w-full max-w-4xl  mx-auto mt-8  shadow-2xl h-fit p-10 mb-8  gap-5 items-center justify-center "
            >
              <span>No Properties currently Added</span>
              <Link to={"/user-panel/add-property"}>
                <button
                  className={`flex items-center gap-2 bg-[#FF385C] text-white
             text-sm font-bold ${
               location.pathname === "/"
                 ? "outline outline-4 outline-gray-400 "
                 : ""
             } rounded-lg p-2`}
                >
                  <span>Start Adding</span>
                  <BsFillHouseAddFill size={"0.9rem"} />
                </button>
              </Link>
            </div>
          )}
          {userProperties && userProperties.length > 0 && (
            <div
              className="flex flex-col 
        w-full max-w-4xl  mx-auto mt-8 bg-white shadow-2xl h-fit mb-8"
            >
              <div className="flex bg-[#F5F6FF] p-2 m-4">
                <h1 className="font-semibold flex-1 max-sm:text-sm text-lg">
                  My Properties
                </h1>
                <div className="flex gap-24 max-sm:text-sm">
                  <span>Date Added</span>
                  <span>Actions</span>
                </div>
              </div>
              <div className="flex flex-col overflow-y-clip ">
                {userProperties.map((item) => (
                  <div key={item._id} className="flex p-4 items-center    ">
                    <div className="flex flex-1 items-center gap-2 truncate">
                      <img
                        src={item.imageUrls[0]}
                        alt="Property cover"
                        className="h-20 w-32 object-fill rounded-md"
                        onClick={() => navigate(`/property/${item._id}`)}
                      />
                      <Link to={`/property/${item._id}`}>
                        <div className="flex flex-col gap-1  cursor-pointer  ">
                          <span className="font-medium capitalize text-[#444444] ">
                            {item.name}
                          </span>
                          <span className="text-[#40486F] capitalize ">
                            {item.address}
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="flex gap-16">
                      <span className="text-[#727CA2]">
                        {item.createdAt.slice(0, item.createdAt.indexOf("T"))}
                      </span>
                      <div className="flex items-center gap-10">
                        <Link to={`/user-panel/edit-property/${item._id}`}>
                          <button
                            className="text-[#288637]"
                            // onClick={() => setEdit(item._id)}
                          >
                            Edit
                          </button>
                        </Link>
                        <RiDeleteBin6Line
                          className="text-[#FF385C] cursor-pointer"
                          onClick={() => handlePropertyDelete(item._id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyProperties;
