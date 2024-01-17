import { useRef, useState } from "react";

const DropdownMenu = () => {
  const [openList, setOpenList] = useState(false);
  const saleRef = useRef();
  const rentRef = useRef();
  return (
    <>
      {openList && (
        <div className="flex flex-col border rounded-md text-[#7E83A0]  w-72 ">
          <span
            className="flex w-full h-full p-2 gap-2 
          hover:bg-[#238AC1] hover:text-white
          checked:bg-[#238AC1] checked:text-white cursor-pointer"
            onClick={() => {
              rentRef.current.click();
              setOpenList(false);
            }}
          >
            <input
              type="checkbox"
              name="type"
              id="Rent"
              className="hidden"
              ref={rentRef}
            />
            <label htmlFor="type">For Rent</label>
          </span>
          <span
            className="flex w-full h-full p-2 gap-2
       hover:bg-[#238AC1] hover:text-white 
        checked:bg-[#238AC1] checked:text-white cursor-pointer"
            onClick={() => {
              saleRef.current.click();
              setOpenList(false);
            }}
          >
            <input
              type="checkbox"
              name="type"
              id="Sale"
              className="hidden"
              ref={saleRef}
            />
            <label htmlFor="type">For Sale</label>
          </span>
        </div>
      )}
    </>
  );
};

export default DropdownMenu;
