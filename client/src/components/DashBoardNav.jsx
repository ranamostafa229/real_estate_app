import { AiOutlineClose } from "react-icons/ai";
import PanelMenu from "./PanelMenu";

/* eslint-disable react/prop-types */
const DashBoardNav = ({ openNav, setOpenNav }) => {
  return (
    <>
      <div
        className={` bg-black/80 fixed w-full h-full z-10 top-0 left-0`}
      ></div>
      <div
        className={`flex flex-col ${
          openNav
            ? "fixed top-0 left-0 w-[300px]   duration-500   z-50 "
            : "fixed top-0 left-[-100%] w-[300px] z-10  duration-500 "
        } gap-5 bg-white  h-full p-6 `}
      >
        <div className="flex justify-between font-bold">
          <span>DashBoard </span>
          <AiOutlineClose
            onClick={() => setOpenNav((prev) => !prev)}
            size={25}
            className=" left-4 cursor-pointer "
          />
        </div>
        {openNav && <PanelMenu openNav={openNav} setOpenNav={setOpenNav} />}
      </div>
    </>
  );
};

export default DashBoardNav;
