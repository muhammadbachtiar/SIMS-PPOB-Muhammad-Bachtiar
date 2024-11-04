import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4
};
const BannerApp = () => {

  const banners =  useSelector((state) => state.app.banner);
  return (
    <div className="slider-container my-4">
      <Slider {...settings}>
      {banners.map((banner, index) => (
        <div key={index}>
          <img className="h-auto max-w-full rounded-lg" src={banner.banner_image} alt={banner.banner_name}></img>
        </div>
      ))}
      </Slider>
    </div>
  );
};

export default BannerApp;