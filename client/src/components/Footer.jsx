import LightLogo from "../assets/logo.svg";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
const Footer = () => {
  return (
    <div className="flex bg-[#232733] ">
      <div className="flex max-sm:flex-wrap  max-w-6xl mx-auto gap-5 p-10">
        <div className="flex flex-col text-[#BDCDD4] gap-5">
          <img src={LightLogo} alt="" className="w-36 h-10 " />
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
            incidunt architecto soluta laboriosam, perspiciatis, aspernatur
            officiis esse.
          </span>
          <div className="flex flex-col">
            <span className="flex items-center gap-2">
              <FaLocationDot className="text-[#FF385C]" />
              95 South Park Avenue, USA
            </span>
            <span className="flex items-center gap-2">
              <BsFillTelephoneFill className="text-[#FF385C]" />
              +456 875 369 208
            </span>
            <span className="flex items-center gap-2">
              <MdEmail className="text-[#FF385C]" />
              support@findhouses.com
            </span>
          </div>
        </div>

        <div className="flex flex-col text-[#BDCDD4]  gap-5">
          <h1 className="text-xl font-semibold text-white">
            Newsletters
            <hr className="w-12  border-2 mt-2 border-[#FF385C]" />
          </h1>
          <span>
            Sign Up for Our Newsletter to get Latest Updates and Offers.
            Subscribe to receive news in your inbox.
          </span>
          <input
            name="message"
            id="message"
            rows="2"
            placeholder="Enter Your Email"
            className=" w-full p-3 rounded-sm bg-[#393d48] "
          ></input>

          <button className="bg-[#FF385C] text-white p-3 w-full text-center">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
