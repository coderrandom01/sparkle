import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./home.css";
import SectionHeader from "../Navigation/Header/SectionHeader";
import { ProductCardSlider, RatingsSlider } from "../Components/carousel";
import { LargeButtonArrow } from "../Components/Buttons/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { newArrivalList, productList, saleList, sellingList } from "../HelperFunctions/utils";
import { bannerImg, enthiCollection, festivalImg } from "config/property/image-property";
import InstructSection from "../Components/InstructSection";
import { useQuery } from "@apollo/client";
import { GET_ALL_HOMEPAGEDATA,FETCH_ACTIVE_ADS } from "apollo/query";

export default function Home() {
  const {data} = useQuery(GET_ALL_HOMEPAGEDATA)
  const {data : adData} = useQuery(FETCH_ACTIVE_ADS)
  const [homePageData,setHomePageData] = useState<any>()
  useEffect(() => {
if(data){
  setHomePageData(data.getHomePageData.responce)
}
  },[data])
  useEffect(() => {
    if(adData){
      console.log("adDataadData",adData);
    }
  })
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
const bannerRedirection = (url : string) => {
  window.open(url, '_blank');
}
  return (
    <>
      <Box className="relative">
        <div className="slider-container">
          <Slider {...settings}>
            {adData?.fetchActiveAds?.response?.map((item : any,i: number) => {
              console.log("iteeeem",item.url+item.imageUrl);
              return <div className="h50 cursor-pointer" onClick={() => bannerRedirection(item.url)}>
              <img src={"https://assets.lisparklez.com/"+item.imageUrl} alt="banner images" className="h-full w-full" />
            </div>

            })}
            {/* <div className="h50" >
              <img src={bannerImg} alt="banner images" className="h-full w-full" />
            </div>
            <div className="h50">
              <img src={bannerImg} alt="banner images" className="h-full w-full" />
            </div> */}
          </Slider>
        </div>
      </Box>
      {/* <Container maxWidth="xl">
        <div className="section">
          <SectionHeader classStyles="mb-2 md:mb-4" title="Explore Products" />
          <ProductCardSlider products={homePageData?.explore_products} />
        </div>
        <div className="section">
          <SectionHeader classStyles="mb-4" title="New Arrivals" />
          <ProductCardSlider products={homePageData?.new_arrivals} />
          <div className="viewMore">
            <LargeButtonArrow />
          </div>
        </div>
        <div className="section">
          <SectionHeader classStyles="mb-4" title="Top Selling Products" />
          <ProductCardSlider products={homePageData?.top_selling_products} />
          <div className="viewMore">
            <LargeButtonArrow />
          </div>
        </div>
      </Container>
      <div
        className="h-40 md:h-96 relative bg-cover bg-no-repeat my-4"
        style={{
          backgroundImage: `url(${festivalImg})`,
        }}
      ></div>
      <Container maxWidth="xl">
        <div className="section">
          <SectionHeader classStyles="mb-4" title="Clearance sale" />
          <ProductCardSlider products={homePageData?.clearance_sale} />
        </div>
      </Container> */}
      {/* <Box className="my-16 relative h-40 md:h-96">
        <div className="absolute bottom-0 h-full w-full">
          <div className="h-full relative overflow-hidden" style={{ background: "linear-gradient(to right, #F6D41C, #F68B29)" }}>
            <div className="bg-primary absolute h-48 w-48 rounded-full -top-16 -left-16"></div>
            <div className="bg-primary absolute h-8 w-8 rounded-full top-7" style={{ left: "56%" }}></div>
            <div className="bg-primary absolute h-48 w-48 rounded-full -bottom-24" style={{ left: "45%" }}></div>
            <div className="absolute h-52 w-52 rounded-full -bottom-12 -right-14" style={{ background: "#F6D41C" }}></div>
          </div>
        </div>
        <div className="absolute overflow-hidden top-0 hidden md:block" style={{ height: "450px", width: "48%", transform: "translate(12%,-14.5%)" }}>
          <img src={enthiCollection} alt="ethnic collection" className="w-full top-0" />
        </div>
      </Box> */}
      <Container maxWidth="xl" className="mt-10">
        <InstructSection isBottom={true} />
        <div className="section">
          <div className="flex justify-center">
            <SectionHeader classStyles="mb-4" title="Let’s see How much love we got!" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4 gap-4">
            <div className="flex flex-col justify-center space-y-3">
              <p className="font-medium text-xl mb-0">Our customers</p>
              <div>
                <span className="font-medium text-4xl">
                  <span className="text-primary">4.5</span>/5
                </span>
                <p className="text-xs">Based on 3768 reviews</p>
              </div>
              <button className="flex items-center justify-center text-xs p-1.5 px-3 border border-primary rounded mt-3 w-fit">
                <span>Leave your Review</span>
              </button>
            </div>
            <div className="md:col-span-3">
              <div className="bg-primary py-5 px-4">
                <RatingsSlider ratings={[]} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
