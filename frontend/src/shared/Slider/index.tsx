import { Carousel } from "antd";
import { sliderInterface } from "../../pages/Inidivid/types";
import { Img } from "../UI/Img";


const Slider = ({sliders}:{sliders:sliderInterface[]}) => {
  return (
 <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={2000}>
    {sliders?.map((slider, index) => (
        <div key={index}>
          <Img src={slider.url} alt="slider"  />
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
