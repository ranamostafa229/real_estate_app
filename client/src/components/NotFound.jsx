import { Link } from "react-router-dom";
import Error from "../assets/error.jpg";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <img src={Error} alt="error" className="w-[600px] h-[500px]" />
      <h1 className="font-bold text-5xl">Page Not Found!</h1>
      <p className="text-[#666B72] text-lg font-semibold">
        Oops! Looks Like Something Going Rong We can’t seem to find the page
        you’re looking for make sure that you have typed the currect URL{" "}
      </p>
      <Link to={"/"}>
        <button
          className="self-center bg-[#FF385C] rounded-md 
     hover:bg-black text-white p-3 text-lg transition-all  ease-in delay-0 duration-300"
        >
          Go To Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
