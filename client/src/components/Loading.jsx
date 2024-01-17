import Loader from "../assets/preloader.gif";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center  w-full h-screen ">
      <img src={Loader} alt="loader" />
    </div>
  );
};

export default Loading;
