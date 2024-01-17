import { GoPersonFill } from "react-icons/go";
import { PiHouseLineFill } from "react-icons/pi";
import { BsHouseAddFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { useDispatch } from "react-redux";
import {
  signOutUserFaliure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LightLogo from "../assets/logo.svg";

// eslint-disable-next-line react/prop-types
const PanelMenu = ({ openNav, setOpenNav }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

  // const handleDelete = async () => {
  //   try {
  //     dispatch(deleteUserStart());
  //     const res = await fetch(`/api/user/delete/${currentUser._id}`, {
  //       method: "DELETE",
  //     });
  //     const data = res.json();
  //     if (data.success === false) {
  //       dispatch(deleteUserFaliure(data));
  //       return;
  //     }
  //     dispatch(deleteUserSuccess());
  //   } catch (error) {
  //     dispatch(deleteUserFaliure(error.message));
  //   }
  // };
  const menuItems = [
    {
      icon: <RxDashboard />,
      title: "Home",
      to: "/",
    },
    {
      icon: <GoPersonFill />,
      title: "Profile",
      to: "/user-panel",
    },
    {
      icon: <PiHouseLineFill />,
      title: "My Properties",
      to: "/user-panel/my-property",
    },
    {
      icon: <BsHouseAddFill />,
      title: "Add Properties",
      to: "/user-panel/add-property",
    },
    // {
    //   icon: <MdDelete />,
    //   title: "Delete Account",
    //   handle: handleDelete,
    // },
    {
      icon: <MdLogout />,
      title: " Log Out",
      handle: handleSignOut,
    },
  ];

  return (
    <div
      className={`flex flex-col min-h-screen md:w-96   z-10  ${
        openNav ? " max-sm:visible " : "max-sm:hidden bg-[#002B4B]"
      }  `}
    >
      <Link to={"/"}>
        <div className="flex  justify-center items-center cursor-pointer max-sm:hidden">
          <img src={LightLogo} alt="logo" className="w-52 " />
        </div>
      </Link>

      <div className={`flex flex-col gap-4 text-lg py-8    `}>
        {menuItems.map((item) => (
          <span
            className={`flex items-center gap-2 cursor-pointer  ${
              location.pathname === item.to
                ? "text-white bg-[#172133] "
                : "text-[#AEB7C2]"
            } hover:text-white  px-10 py-2 ${item.to === "/" && "md:hidden"}`}
            key={item.title}
            onClick={
              item.to
                ? () => {
                    navigate(item.to);
                    setOpenNav(false);
                  }
                : item.handle
            }
          >
            {item.icon}
            {item.title}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PanelMenu;
