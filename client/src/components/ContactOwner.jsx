import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";

/* eslint-disable react/prop-types */
const ContactOwner = ({ property }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState(null);
  const fetchOwnerData = async () => {
    try {
      const res = await fetch(`/api/user/${property?.userRef}`);
      const data = await res.json();
      setOwner(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    fetchOwnerData();
  }, [property.userRef]);
  console.log(owner);
  return (
    <>
      {property.userRef !== currentUser?._id && (
        <div className={`flex flex-col bg-white shadow-lg p-5 gap-5 h-fit`}>
          <h1 className="text-xl font-semibold">
            Contact Owner
            <hr className="w-12  border-2 mt-2 border-[#FF385C]" />
          </h1>
          {
            <>
              <div className="flex gap-2">
                {owner?.avatar && (
                  <img
                    src={owner?.avatar}
                    alt=""
                    className="w-16 h-16 rounded-full"
                  />
                )}

                <div className="flex flex-col gap-2 ">
                  <span className="capitalize">{owner?.username}</span>
                  <div className="flex items-center text-[#766F82] gap-1">
                    <MdEmail />
                    <span>{owner?.email}</span>
                  </div>
                </div>
              </div>
              {currentUser && (
                <textarea
                  name="message"
                  id="message"
                  rows="2"
                  value={message}
                  onChange={handleChange}
                  placeholder="Send message here..."
                  className=" w-full border p-3 rounded-lg "
                ></textarea>
              )}
              <Link
                to={
                  currentUser
                    ? `mailto:${owner?.email}?subject=Regarding ${property.name}&body=${message}`
                    : `/signin`
                }
                state={{ from: location.pathname }}
                className="bg-[#FF385C] text-white p-3 w-full text-center"
              >
                {currentUser ? "Send Message" : "Start Contact"}
              </Link>
            </>
          }
        </div>
      )}
    </>
  );
};

export default ContactOwner;
