import React, { useEffect, useState } from "react";
// components
import { Box, Checkbox, Chip, Container, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ProductCard from "../Components/Card/ProductCard";
// styles
import "./products.css";
import { productList } from "HelperFunctions/utils";
import InstructSection from "../Components/InstructSection";

export default function Products() {
  const [minPrice, setMinPrice] = useState(10000);
  const [maxPrice, setMaxPrice] = useState(50000);
  const interval = 10000;
  const [priceRanges, setPriceRanges] = useState<String[]>([]);

  useEffect(() => {
    filterMenu();
  }, []);

  function filterMenu() {
    let i = minPrice;
    let priceList = [];
    while (i < maxPrice) {
      priceList.push(`${i} - ${i + interval}`);
      i = i + interval;
    }
    setPriceRanges(priceList);
  }

  return (
    <>
      <div className="bg-primary text-white p-3 text-center">
        <h2 className="text-2xl font-medium">Kurthis</h2>
      </div>
      <Container maxWidth="lg" className="space-y-5 my-12">
        <Box className="grid grid-cols-3 md:grid-cols-5 gap-6">
          <div className="flex flex-col">
            <div className="flex justify-between mb-3 text-base items-center">
              <h3 className="font-medium">Filters</h3>
              <span className="text-primary text-sm cursor-pointer select-none">Reset</span>
            </div>
            <Divider />
            <List>
              <ListItem className="!py-1" sx={{ paddingLeft: 0 }}>
                <ListItemText classes={{ primary: "!text-sm" }} primary="Price" />
              </ListItem>
              {priceRanges.map((item: any) => {
                return (
                  <ListItem className="space-x-2 !py-1">
                    <ListItemIcon className="!min-w-fit">
                      <Checkbox size="small" className="!p-0" color="primary" />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: "!text-sm" }} primary={item} />
                  </ListItem>
                );
              })}
            </List>
          </div>
          <div className="col-span-2 md:col-span-4 space-y-2.5">
            <div className="flex flex-wrap items-center w-full gap-2">
              <Chip className="!text-xs font-semibold" label='10000-20000' onDelete={()=>{}} />
              <Chip className="!text-xs font-semibold" label='M' onDelete={()=>{}} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {productList.map((item) => (
                <ProductCard imageSrc={item?.src} produtName={"Slim Fit T-Shirt"} rating={4.3} ratingCount={470} actualprice={500} originalPrice={700} />
              ))}
            </div>
          </div>
        </Box>
        <div className="my-14">
          <InstructSection isTop={true} />
        </div>
      </Container>
    </>
  );
}
