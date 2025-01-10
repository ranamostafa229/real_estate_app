import { useEffect, useState } from "react";
import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SignUp = ({ setIsNewAccount }) => {
  const [formData, setFormData] = useState({});
  // eslint-disable-next-line no-unused-vars

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUpStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signUpFailure(data.message));

        return;
      }

      dispatch(signUpSuccess(data));
      setIsNewAccount(false);
      console.log(data);
    } catch (error) {
      // console.log(error.message);
      dispatch(signUpFailure("Something went wrong, Please try again ."));
    }
  };
  useEffect(() => {
    dispatch(signUpFailure(""));
  }, []);
  return (
    <div
      className={`flex flex-col ${
        location.pathname === "/signup" && "h-screen max-sm:w-screeen"
      } items-center justify-center  
  `}
    >
      <div
        className={`flex flex-col gap-5 h-fit  items-center justify-center p-20 shadow-lg rounded-md`}
      >
        <h1 className=" text-xl font-semibold">Create an account</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="outline outline-1 outline-gray-100 p-2 focus:border-none  rounded-sm
        focus:outline-[#00aeff] focus:shadow-sm focus:shadow-[#00aeff]
          text-[#8A8A8A]  "
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="outline outline-1 outline-gray-100 p-2 focus:border-none  rounded-sm
        focus:outline-[#00aeff] focus:shadow-sm focus:shadow-[#00aeff]
          text-[#8A8A8A]  "
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="outline outline-1 outline-gray-100 p-2 focus:border-none  rounded-sm
          focus:outline-[#00aeff] focus:shadow-sm focus:shadow-[#00aeff] focus:drop-shadow-md
       "
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Retype Password"
            className="outline outline-1 outline-gray-100 p-2 focus:border-none  rounded-sm
          focus:outline-[#00aeff] focus:shadow-sm focus:shadow-[#00aeff] focus:drop-shadow-md
       "
            onChange={handleChange}
            required
          />
          <button
            disabled={loading}
            className="bg-[#00AEFF] text-white p-2 
          text-sm rounded-md font-semibold hover:bg-transparent transition-all ease-in-out 
        hover:text-[#00AEFF] hover:outline hover:outline-1 hover:outline-[#00AEFF]"
          >
            {loading ? "Loading...." : " Register"}
          </button>
          <span className="text-center text-[#416582]">or</span>
          <OAuth />
          <div className="flex flex-wrap w-full justify-center text-red-600">
            {Object.keys(formData).length > 0 && error}
          </div>
        </form>
        <div className="flex gap-1">
          <span>Already have an account?</span>
          <span
            className="cursor-pointer"
            onClick={() => {
              location.pathname !== "/" && navigate("/signin");

              setIsNewAccount(false);
            }}
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
