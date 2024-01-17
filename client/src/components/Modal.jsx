import { IoClose } from "react-icons/io5";
// import SignIn from "../pages/SignIn";

/* eslint-disable react/prop-types */
export default function Modal({ isOpen, setIsOpen, children }) {
  return (
    <div className="flex  h-screen  ">
      {isOpen ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto 
          fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white 
              outline-none focus:outline-none"
              >
                {/*header*/}
                <div className="flex items-start justify-between p-2 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-gray-300
                    float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsOpen(false)}
                  >
                    <IoClose />
                  </button>
                </div>
                {/*body*/}
                <div className="relative  flex-auto ">{children}</div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
