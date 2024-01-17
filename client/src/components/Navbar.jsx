/* eslint-disable no-unused-vars */
import { Link, useLocation } from "react-router-dom";
import LightLogo from "../assets/logo.svg";
import DarkLogo from "../assets/logo-red.svg";
import WhiteLogo from "../assets/logo-white.svg";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import Modal from "./Modal";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { useSelector } from "react-redux";
import { FaPlusCircle } from "react-icons/fa";
import { BsFillHouseAddFill } from "react-icons/bs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewAccount, setIsNewAccount] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  return (
    <nav
      className={`flex overflow-hidden   ${
        location.pathname === "/"
          ? "absolute z-10 outline outline-2 outline-[#9CB5C5] "
          : location.pathname.includes("/user-panel")
          ? "  fixed right-0 z-10  max-sm:w-screen "
          : "bg-white  max-sm:w-screen "
      }   shadow-gray-200 drop-shadow-xl w-full   `}
    >
      <div
        className={`flex ${
          location.pathname.includes("/user-panel") ? "" : " "
        }    justify-between w-full h-fit `}
      >
        <Link to={"/"}>
          <div
            className={`flex ${
              location.pathname.includes("/user-panel")
                ? " hidden "
                : "bg-transparent"
            }    h-20 bg-black  `}
          >
            <img
              src={location.pathname === "/" ? WhiteLogo : DarkLogo}
              alt="logo"
              className={`px-10  ${
                location.pathname.includes("/user-panel")
                  ? "w-fit  max-sm:hidden"
                  : "max-sm:w-32 w-36"
              }`}
            />
          </div>
        </Link>

        <div className="flex items-center gap-2 p-3 ">
          <Link
            to={{
              pathname: currentUser && currentUser?.username && "/user-panel",
            }}
          >
            {currentUser && currentUser?.username ? (
              <div
                className=" flex flex-wrap justify-center gap-2 text-[#6E6E6E] font-medium items-center
                "
              >
                {currentUser.avatar && (
                  <img
                    className="rounded-full w-7 h-7 object-cover max-sm:hidden "
                    src={currentUser.avatar}
                    alt="profile"
                  />
                )}
                <span className="capitalize ">Hi,{currentUser.username}!</span>
              </div>
            ) : (
              location.pathname === "/" && (
                <CgProfile
                  className="text-white text-2xl cursor-pointer"
                  onClick={() =>
                    !currentUser && location.pathname === "/" && setIsOpen(true)
                  }
                  size={"1.8rem"}
                />
              )
            )}
          </Link>
          <Link
            to={{
              pathname:
                !currentUser && location.pathname === "/"
                  ? "/"
                  : "/user-panel/add-property",
            }}
          >
            <button
              className={`flex items-center gap-2 bg-[#FF385C] text-white
                text-sm font-bold ${
                  location.pathname.includes("/user-panel")
                    ? "hidden "
                    : `${
                        location.pathname === "/"
                          ? "outline outline-4 outline-gray-400 "
                          : ""
                      }  `
                } rounded-lg p-2 `}
              onClick={() =>
                !currentUser && location.pathname === "/" && setIsOpen(true)
              }
            >
              <span className=" max-sm:hidden">Add Property</span>
              <BsFillHouseAddFill />
            </button>
          </Link>
        </div>
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          {isNewAccount ? (
            <SignUp setIsNewAccount={setIsNewAccount} />
          ) : (
            <SignIn setIsOpen={setIsOpen} setIsNewAccount={setIsNewAccount} />
          )}
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
