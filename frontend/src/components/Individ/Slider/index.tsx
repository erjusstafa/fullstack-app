import { Carousel } from "antd";
import { sliderInterface } from "../types";


const Slider = ({sliders}:{sliders:sliderInterface[]}) => {
  return (
 <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={2000}>
    {sliders?.map((slider, index) => (
        <div key={index}>
          <img src={slider.url} alt="slider"  />
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
