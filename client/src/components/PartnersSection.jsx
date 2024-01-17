import Title from "./Title";
import bg from "../assets/bg-pattern-dot.png";
import slide1 from "../assets/11.jpg";
import slide2 from "../assets/12.jpg";
import slide3 from "../assets/13.jpg";
import slide4 from "../assets/14.jpg";
import slide5 from "../assets/15.jpg";
import slide6 from "../assets/16.jpg";
const PartnersSection = () => {
  const images = [slide1, slide2, slide3, slide4, slide5, slide6];

  return (
    <div
      className="flex flex-col  gap-5 bg-repeat p-16 "
      style={{ background: `url(${bg})   ` }}
    >
      <Title
        word1={"OUR"}
        word2={"PARTNERS"}
        word3={"The Companies That Represent Us."}
      />
      <div className="flex flex-wrap justify-center gap-10">
        {images.map((image) => (
          <img src={image} alt="" key={image} />
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
