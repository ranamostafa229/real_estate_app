/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = ({ setIsOpen, setIsNewAccount }) => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate(-1);

      setIsOpen(false);
    } catch (error) {
      console.log(error.message);
      dispatch(signInFailure("Something went wrong, Please try again ."));
    }
  };
  useEffect(() => {
    dispatch(signInFailure(""));
  }, []);
  return (
    <div
      className={`flex  ${
        location.pathname === "/signin" && "h-screen max-sm:w-screen "
      } items-center justify-center  
    `}
    >
      <div className="flex flex-col gap-5 h-fit  items-center justify-center p-20 shadow-lg rounded-md">
        <h1 className=" text-xl font-semibold">Sign into your account</h1>
        <form
          className="flex flex-col gap-5 items-center  "
          onSubmit={handleSubmit}
        >
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
          <button
            className="bg-[#00AEFF] text-white p-2 w-full
      text-sm rounded-md font-semibold hover:bg-transparent transition-all ease-in-out 
       hover:text-[#00AEFF] hover:outline hover:outline-1 hover:outline-[#00AEFF]"
          >
            {loading ? "Loading...." : " Login"}
          </button>
        </form>
        <span className="text-center text-[#416582]">or</span>
        <OAuth setIsOpen={setIsOpen} />
        <p className="flex flex-wrap w-full justify-center text-red-600">
          {error}
        </p>

        <div className="flex gap-1">
          <span>Don&apos;t have an account?</span>
          <span
            className="cursor-pointer"
            onClick={() => {
              location.pathname !== "/" && navigate("/signup");
              setIsNewAccount(true);
            }}
          >
            Register here
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
