import { useState } from "react";
import PanelMenu from "../components/PanelMenu";
import { PiListFill } from "react-icons/pi";
import { Outlet } from "react-router-dom";
import DashBoardNav from "../components/DashBoardNav";

const UserPanel = () => {
  const [openNav, setOpenNav] = useState(false);
  return (
    <div className="flex max-sm:w-fit overflow-x-hidden  ">
      {/* left side */}
      <PanelMenu />
      {/* right side */}
      <div className="flex flex-col w-full mt-12 ">
        <div
          onClick={() => setOpenNav((prev) => !prev)}
          className="flex bg-[#f7f8f9]  md:hidden px-5 pt-5 items-center gap-2 font-semibold"
        >
          <PiListFill />
          <span>DashBoard Navigation</span>
        </div>
        {openNav && <DashBoardNav openNav={openNav} setOpenNav={setOpenNav} />}
        <Outlet />
      </div>
    </div>
  );
};

export default UserPanel;
