import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../Card/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./slider.css";
import RatingCard from "../Card/RatingCard";
import { CardMedia } from "@mui/material";
import { s3ImgUrl } from "HelperFunctions/basicHelpers";

interface SliderProps {
  products: any;
}

const LeftArrow = ({ onClick, classStyles }: any) => {
  return (
    <button onClick={() => onClick()} className={`${classStyles}`}>
      <ChevronLeft className="slider-arrow" height={18} width={18} />
    </button>
  );
};

const RightArrow = ({ onClick, classStyles }: any) => {
  return (
    <button onClick={() => onClick()} className={`${classStyles}`}>
      <ChevronRight className="slider-arrow" height={18} width={18} />
    </button>
  );
};

export const ProductCardSlider = ({ products }: SliderProps) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: <LeftArrow classStyles={"slick-arrow slick-prev slider-arrow-button -left-1"} />,
    nextArrow: <RightArrow classStyles={"slick-arrow slick-next slider-arrow-button -right-1"} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {products?.map((item: any) => (
          <div className="p-3">
            <ProductCard imageSrc={item.image} produtName={item.title} rating={4.3} ratingCount={470} actualprice={item?.size_and_price[0]?.display_price} originalPrice={item?.size_and_price[0]?.price} id ={item?.id} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

interface RatingsSliderProps {
  ratings: any;
}

export const RatingsSlider = ({ ratings }: RatingsSliderProps) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <LeftArrow classStyles={"slick-arrow slick-prev rating-arrow-button -left-8"} />,
    nextArrow: <RightArrow classStyles={"slick-arrow slick-next rating-arrow-button -right-8"} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="p-2">
          <RatingCard name="Robin" rating={5} message="Looks exactly the same as in the photo" />
        </div>
        <div className="p-2">
          <RatingCard name="Robin" rating={5} message="Looks exactly the same as in the photo" />
        </div>
        <div className="p-2">
          <RatingCard name="Robin" rating={5} message="Looks exactly the same as in the photo" />
        </div>
        <div className="p-2">
          <RatingCard name="Robin" rating={5} message="Looks exactly the same as in the photo" />
        </div>
        <div className="p-2">
          <RatingCard name="Robin" rating={5} message="Looks exactly the same as in the photo" />
        </div>
      </Slider>
    </div>
  );
};

export const ProductCardMediaSlider = ({ productImageList }: { productImageList: any }) => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container slider-product-image-list h-full">
      <Slider {...settings} className="max-h-full">
        {productImageList?.map((item: any) => (
          <img src={item?.src ? item.src : s3ImgUrl+item} className="h-full rounded-sm sm:rounded-md object-cover object-top" alt="ProductImage" />
        ))}
      </Slider>
    </div>
  );
};
