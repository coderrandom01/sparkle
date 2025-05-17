import React, { useEffect, useState } from "react";
// components
import { Box, Container, Divider } from "@mui/material";
import SectionHeader from "../Navigation/Header/SectionHeader";
import ProductCard from "../Components/Card/ProductCard";
// styles
import "./products.css";
// images
import { ContainedButton, LargeButtonArrow, OutlinedButton } from "../Components/Buttons/Button";
import { productList } from "../HelperFunctions/utils";
import { InputNumber } from "../Components/input/InputRange";
import { GET_PRODUCT_BY_ID } from "apollo/query";
import { useQuery } from "@apollo/client";
import InstructSection from "../Components/InstructSection";
import { s3ImgUrl } from "HelperFunctions/basicHelpers";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// interface ProductData{
//   id : string
//   title : string
//   description : string
//   category_id : string
//   size_and_price : Array<{
//     _id : string
//     size : number
//     price : number
//     discount : number
//     display_price : number
//     colors  : Array<{
//       color : string
//       available_count : number
//       sold_out : boolean
//       __typename : string
//     }>
//     __typename : string
//   }>
//   status : string
//   image : Array<any>
//   sold_out_count : number
//   likes : number
//   total_available_count : number
//   createdAt : string
//   updatedAt: string
//   __typename : string
// }
export default function ProductDetails() {
  const navigate = useNavigate()
  const [activeImg, setActiveImg] = useState(0);
  const [productSize, setProductSize] = useState("s");
  const [productCount, setProductCount] = useState(1);
  const [sizes,setSizes] = useState([])
  const { id } = useParams();

  const defaultSize = ["s", "m", "l", "xl", "xxl"];
  const [selectedPriceDetails, setSelectedPriceDetails] = useState<any>({});
  const defaultColor = ["#FFD763", "#FF4C4C", "#F7A919", "#8BDF16", "#585454"];
  const [selectedColorData, setSelectedColorData] = useState<any>({})
  const [estimatedDates,setEstmatedDates] = useState<{startDate: string , endDate : string}>({startDate: "" , endDate : ""})
  const [availableCountError,setAvailableCountError] = useState<boolean>(false)
  // const variables = {getProductByIdId : "6793d5cbdcbfd502dc151408"}
  const [productData, setProductData] = useState<any>({
    id: "",
    title: "new ",
    description: "",
    category_id: "",
    size_and_price: [
      {
        _id: "",
        size: 0,
        price: 0,
        discount: 0,
        display_price: 0,
        colors: [
          {
            color: "",
            available_count: 0,
            sold_out: false,
            __typename: "",
          },
        ],
        __typename: "SizeAndPrice",
      },
    ],
    
    "status": "",
    "image": [ ],
    "sold_out_count": 0,
    "likes": 0,
    "total_available_count": 0,
    "createdAt": "",
    "updatedAt": "",
    "__typename": "Product"
})
    const { data }  = useQuery(GET_PRODUCT_BY_ID, {
            variables : {getProductByIdId : id},
            // skip : !id,
          });
          useEffect(() => {
            if(!id){
              navigate("/")
            }
          },[])
          useEffect(() => {
            // console.log("datadata",data.getProductById.responce) // Check this data
            if(data?.getProductById){
              setProductData(data.getProductById.responce)
              const sizes = data.getProductById.responce.size_and_price.map((item: { size: any; }) => item.size); 
              // setProductSize(sizes[0])
              handleSizeSelection(sizes[0], data.getProductById.responce)
              setSizes(sizes)

              estimatedDelivery()
            }

          },[data])
          const estimatedDelivery = () => {
            const currentDate = new Date();
            const endDate = new Date();
            endDate.setDate(currentDate.getDate() + 7);
          
            const options : any = { day: "numeric", month: "short" };
            const startDateString = currentDate.toLocaleDateString("en-US", options);
            const endDateString = endDate.toLocaleDateString("en-US", options);
            setEstmatedDates({startDate : startDateString,endDate : endDateString})
          }
  const handleAddQuanity = () =>{
    if(productCount >= selectedColorData.available_count){
      setAvailableCountError(true)
    }else{
      setProductCount((count) => count +1);
    }
  }
  const handleSizeSelection = (size : any, data? : any) => {
    setProductSize(size);
    const prodData = data ? data : productData
    const selectedDetails = prodData.size_and_price.find((item: { size: any; }) => item.size === size);
    setSelectedPriceDetails(selectedDetails);
    colorClicked(selectedDetails.colors[0].color,selectedDetails)
    setAvailableCountError(false)
  };
  const handleRemoveQuanity = () =>{
    if(productCount > 1){
      setProductCount((count) => count-1);
    }
  };
  const colorClicked = (color : string, data? : any) => {
    const selectedData = data ? data : selectedPriceDetails
    // console.log("object",selectedPriceDetails.colors.map((item : {color : any}) => item));
    const selectedColorData = selectedData.colors.find((item : any) => item.color === color)
    setSelectedColorData(selectedColorData)
    setAvailableCountError(false)

  }

  return (
    <>
      <Container maxWidth="lg" className="my-12">
        <div className="flex gap-4">
          <div>
            <div className="flex justify-center space-x-3 h-full">
              <div className="flex w-14 flex-col gap-4 order-last md:order-first">
                {productData?.image.slice(0, 5).map((item: any, index: number) => {
                  if (activeImg === index) return <></>;
                  return <img onClick={() => setActiveImg(index)} className="h-10 md:h-20 rounded-sm cursor-pointer" src={s3ImgUrl+item} alt="product" />;
                })}
              </div>
              <div className="w-11/12 space-y-3 ">
                <div
                  className="h-[90%] bg-cover"
                  style={{
                    backgroundImage: s3ImgUrl+productData.image[activeImg] ? `url(${s3ImgUrl+productData.image[activeImg]})` : "none",
                  }}
                ></div>
                <div className="grid grid-cols-2 gap-2">
                  <OutlinedButton name="Add to cart" handleClick={() => {}} />
                  <ContainedButton name="Buy now" handleClick={() => {}} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="p-1 md:px-3 md:py-2">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-lg md:text-2xl font-medium">{productData?.title}</h3>
                  {/* <p className="text-xs">A vibrant yellow kurthi that radiates warmth and elegance, perfect for adding a cheerful touch to any occasion. Its lightweight fabric ensures comfort while maintaining a stylish, contemporary look.</p> */}
                </div>
                <div>
                  <ul className="flex space-x-2">
                    <li>₹ {selectedPriceDetails?.display_price}</li>
                    <li className="space-x-1">
                      <span className="line-through text-gray-400">₹ {selectedPriceDetails?.price}</span>
                      <span className="text-red-700">{`(${selectedPriceDetails?.discount}% off)`}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center">
                  <div className="font-medium text-xs md:text-sm mr-2">
                    <p>Size :</p>
                  </div>
                  <ul className="productSize">
                    {sizes?.map((size) => (
                      <li onClick={() => handleSizeSelection(size)} className={`${size === productSize ? "active" : ""}`}>
                        {size}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center">
                  <div className="font-medium text-xs md:text-sm mr-2">
                    <p>Color :</p>
                  </div>
                  <div className="flex space-x-3">
                    {selectedPriceDetails?.colors?.map((color: any) => (
                      <div style={{ backgroundColor: color.color }} className={`size-5 rounded-full cursor-pointer border-2`} onClick={() => colorClicked(color.color)}></div>
                    ))}
                  </div>
         
                  <ul className="productColor">
                    {defaultColor.map((color) => (
                      <li style={{ backgroundColor: `${color}` }} className={``} onClick={() => colorClicked(color)}></li>
                    ))}
                  </ul>
                </div>
                <div>
                <p className="text-xs">
                    <span className="font-medium">Available :</span>{ !selectedColorData.sold_out ? <span className="font-bold">{selectedColorData.available_count}</span> : <span className="font-bold bg-red-500">SOld Out!</span> }
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="font-medium text-xs md:text-sm mr-2">
                    <p>Quanity :</p>
                  </div>
                  <div>
                    <InputNumber value={productCount} addQuanity={handleAddQuanity} removeQuanity={handleRemoveQuanity} />
                  </div>
                </div>
                  <div>
                    {availableCountError && <p className="text-red-500">{`The Quantity need to be less than ${selectedColorData.available_count}`}</p>}
                  </div>
                <div>
                  <p className="text-xs">
                    <span className="font-medium">Estimated Delivery :</span> <span className="font-bold">{estimatedDates.startDate} - {estimatedDates.endDate}</span>
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-medium">Product Description</h3>
                    <span className="border-b-2 border-primary block mt-2 w-20"></span>
                  </div>
                  <p className="text-sm">{productData.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container maxWidth="lg" className="my-12">
        <SectionHeader classStyles="mb-4" title="Related Products" />
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 py-5 mb-5">
          {productList.map((item: any) => (
            <ProductCard imageSrc={item.src} produtName={"Slim Fit T-Shirt"} rating={4.3} ratingCount={470} actualprice={500} originalPrice={700} />
          ))}
        </div>
        <div className="flex justify-center w-100">
          <LargeButtonArrow />
        </div>
      </Container>
      <div className="my-14">
        <InstructSection isTop={true} />
      </div>
    </>
  );
}
