import React from "react";
import { Card, CardContent, CardMedia, Container } from "@mui/material";
import SectionHeader from "Navigation/Header/SectionHeader";
import { useNavigate } from "react-router-dom";
import { OutlinedButton } from "../Components/Buttons/Button";
import InstructSection from "../Components/InstructSection";
import { productList } from "HelperFunctions/utils";
import { CurrencyRupee } from "@mui/icons-material";
import { InputNumber } from "../Components/input/InputRange"

function ShoppingCart() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" className="my-12 space-y-6">
      <SectionHeader title={`Shopping cart (${productList.length} Item)`} />
      <div className="grid md:grid-cols-2 gap-6 py-5 mb-5">
        {productList.map((item: any) => (
          <Card className="flex p-3 border-2 border-primary">
            <CardMedia sx={{ objectPosition: 'top' }} className="!size-40 rounded-sm" component="img" image={item.src} alt="cart" />
            <CardContent className="flex-1 space-y-2 !py-2">
              <div>
                <h4 className="text-sm sm:text-base">Slim Fit T-Shirt</h4>
                <p className="text-xs">A vibrant yellow kurthi that radiates warmth and elegance, perfect for adding a cheerful...</p>
              </div>
              <div className="flex gap-2  text-sm items-center font-medium">
                <p className="flex items-center line-height-0">
                  <span>
                    <CurrencyRupee className="!text-xs sm:!text-sm mr-0.5" />
                  </span>
                  <span>500</span>
                </p>
                <p className="line-through text-gray-400 flex items-center line-height-0">
                  <span>
                    <CurrencyRupee className="!text-xs sm:!text-sm mr-0.5" />
                  </span>
                  <span>700</span>
                </p>
                <span className="text-red-600">(30% off)</span>
              </div>
              <div className="flex items-center">
                <div className="font-medium text-xs md:text-sm mr-2">
                  <p>Quanity :</p>
                </div>
                <div>
                  <InputNumber value={0} addQuanity={() => {}} removeQuanity={() => {}} />
                </div>
              </div>
              <div className="flex gap-2 text-sm font-medium">
                <button className="bg-gray-500 py-0.5 px-1.5 text-gray-200 rounded-sm">Remove</button>
                <button className="bg-primary py-0.5 px-1.5 text-white rounded-sm">Buy now</button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        <OutlinedButton name="Go to Shop" handleClick={() => navigate("/")} />
      </div>
      <InstructSection isTop={true} />
    </Container>
  );
}

export default ShoppingCart;
