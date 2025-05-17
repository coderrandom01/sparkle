import React, { useState } from "react";
import { AddShoppingCartOutlined, CurrencyRupee, FavoriteBorderOutlined, Star } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, IconButton } from "@mui/material";
import { ProductCardMediaSlider } from "Components/carousel";
import { productList } from "HelperFunctions/utils";
import { useNavigate } from "react-router-dom";
interface ProductCardProps {
  imageSrc: string;
  produtName: string;
  rating: any;
  ratingCount: any;
  actualprice: any;
  originalPrice: any;
  isWishlist?: boolean;
  id?: string
}

function ProductCard({ imageSrc, produtName, rating, ratingCount, actualprice, originalPrice, isWishlist = false,id }: ProductCardProps) {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate()
  const handleRoute = () => {
    console.log("sssssssssssssssssssss");
    navigate(`/productDetails/${id}`)
  }
  return (
    <Card style={{ boxShadow: "none", borderRadius: 0 }} >
      <CardActionArea
        disableRipple
        onMouseEnter={() => {
          void document.body.offsetWidth;
          setAnimate(true); // Reapply animation
        }}
        onMouseLeave={() => setAnimate(false)}
        className="relative shadow-sm !rounded-sm sm:!rounded-md cart-action-area h-60"
        classes={{
          focusHighlight: "!opacity-55 z-10 ",
        }}
      >
        <ProductCardMediaSlider productImageList={!id ?  productList : imageSrc} />
        {!isWishlist && (
          <div className="flex flex-col space-y-2 items-center justify-center absolute top-2 sm:top-3 right-2 z-20">
            <IconButton size="small" className="hover:!bg-white card-action-button">
              <FavoriteBorderOutlined className="!text-xs sm:!text-base !fill-white icon-fav" />
            </IconButton>
            <IconButton size="small" className={`hover:!bg-white  card-action-button  ${animate ? "animate__animated animate__slideInRight animate__faster" : "!hidden"}`}>
              <AddShoppingCartOutlined className="!text-xs sm:!text-base !fill-white icon-cart" />
            </IconButton>
          </div>
        )}
      </CardActionArea>
      <CardContent className="text-xs sm:text-sm space-y-0.5 sm:space-y-1 mt-1 sm:mt-1.5 cursor-pointer" sx={{ "&.MuiCardContent-root": { padding: "6px", backgroundColor: "transparent" } }}  onClick = {handleRoute}>
        <div className="text-xs sm:text-sm">{produtName}</div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-1 items-center">
            <p className="flex items-center line-height-0">
              <span>
                <CurrencyRupee className="!text-xs sm:!text-sm mr-0.5" />
              </span>
              <span>{actualprice}</span>
            </p>
            <p className="line-through text-gray-400 flex items-center line-height-0">
              <span>{originalPrice}</span>
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-1 text-xs">
              <span className="flex items-center rounded-md bg-primary text-white px-1">
                <Star className="!text-white !text-xs" />
                {rating}
              </span>
              <span>({ratingCount})</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
