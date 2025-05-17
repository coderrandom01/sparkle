import { Bounce, toast } from 'react-toastify';
import productImg1 from '../assets/images/products/product-1.png';
import productImg2 from '../assets/images/products/product-2.png';
import productImg3 from '../assets/images/products/product-3.png';
import productImg4 from '../assets/images/products/product-4.png';
import productImg5 from '../assets/images/products/product-5.png';
import productImg6 from '../assets/images/products/product-6.png';
import productImg7 from '../assets/images/products/product-7.png';
import productImg8 from '../assets/images/products/product-8.png';

export const productList =[
    { src: productImg1 },
    { src: productImg2 },
    { src: productImg3 },
    { src: productImg4 },
    { src: productImg5 },
    { src: productImg6 },
    { src: productImg7 },
    { src: productImg8 },
]

export const newArrivalList =[
    { src: productImg6 },
    { src: productImg7 },
    { src: productImg8 },
    { src: productImg2 },
    { src: productImg1 },
    { src: productImg4 },
]

export const sellingList =[
    { src: productImg4 },
    { src: productImg5 },
    { src: productImg6 },
    { src: productImg7 },
    { src: productImg8 },
    { src: productImg1 },
]

export const saleList =[
    { src: productImg8 },
    { src: productImg7 },
    { src: productImg6 },
    { src: productImg5 },
    { src: productImg4 },
    { src: productImg3 },
]

const toastOptions = {
    autoClose: 2000,
}
export const sucessToast = (message : string) => { toast.success(message, { ...toastOptions }) }
export const errorToast = (message : string) => { toast.error(message, { ...toastOptions }) }
export const infoToast = (message : string) => { toast.info(message, { ...toastOptions }) }