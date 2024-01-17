/* eslint-disable react/prop-types */

const Title = ({ word1, word2, word3 }) => {
  return (
    <div
      className="flex flex-col justify-center items-center 
    gap-2 text-black font-semibold  "
    >
      <h1 className="flex items-center max-sm:text-xl text-4xl gap-2">
        <hr className="w-12  border-2 mt-2 border-[#FF385C]" />
        {word1}{" "}
        <span className="text-[#FF385C] font-bold max-sm:text-2xl ">
          {word2}
        </span>
      </h1>
      <span className="pl-[70px] text-[#614B4A]  font-normal">{word3}</span>
    </div>
  );
};

export default Title;
