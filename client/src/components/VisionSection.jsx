import bg from "../assets/bg-pattern-dot.png";
import icon1 from "../assets/icon-4.svg";
import icon2 from "../assets/icon-5.svg";
import icon3 from "../assets/icon-6.svg";
import Title from "./Title";
const VisionSection = () => {
  const cardItems = [
    {
      icon: icon1,
      title: "Wide Renge Of Properties",
      text: "lorem ipsum dolor sit amet, consectetur pro adipisici consectetur debits adipisicing lacus consectetur Business Directory.",
    },
    {
      icon: icon2,
      title: "Trusted by thousands",
      text: "lorem ipsum dolor sit amet, consectetur pro adipisici consectetur debits adipisicing lacus consectetur Business Directory.",
    },
    {
      icon: icon3,
      title: "Financing made easy",
      text: "lorem ipsum dolor sit amet, consectetur pro adipisici consectetur debits adipisicing lacus consectetur Business Directory.",
    },
  ];
  return (
    <div className="bg-repeat p-16 " style={{ background: `url(${bg})   ` }}>
      <Title
        word1={"WHY"}
        word2={"CHOOSE US"}
        word3={"We provide full service at every step."}
      />
      <div className="flex flex-wrap gap-10 pt-10  justify-center ">
        {cardItems.map((item) => (
          <div
            key={item.title}
            className="bg-white flex flex-col gap-4 items-center w-fit p-5 rounded-sm border "
          >
            <img src={item.icon} alt="" className="w-20 h-20" />
            <span className="font-semibold text-[#262626] text-xl ">
              {item.title}
            </span>
            <p className="text-center w-80">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisionSection;
