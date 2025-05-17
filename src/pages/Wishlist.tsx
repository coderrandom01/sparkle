import React from 'react'
import { Container } from '@mui/material'
import InstructSection from '../Components/InstructSection'
import { OutlinedButton } from '../Components/Buttons/Button'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../Components/Card/ProductCard'
import { productList } from 'HelperFunctions/utils'
import SectionHeader from '../Navigation/Header/SectionHeader'

function Wishlist() {
  const navigate = useNavigate();
  return (
    <Container maxWidth='lg' className='my-12 space-y-6'>
        <SectionHeader title='Wish List'  />
        <div className='flex flex-col justify-center items-center'>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 py-5 mb-5">
          {productList.map((item: any) => (
            <div className='space-y-2'>
              <ProductCard isWishlist={true} imageSrc={item.src} produtName={"Slim Fit T-Shirt"} rating={4.3} ratingCount={470} actualprice={500} originalPrice={700} />
              <div className='flex gap-2 text-sm justify-between'>
                <button className='bg-gray-500 px-1.5 text-gray-200 rounded-sm'>Remove</button>
                <button className='bg-primary px-1.5 text-white rounded-sm'>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
        <OutlinedButton name='Go to Shop' handleClick={()=> navigate('/')} />
        </div>
        <InstructSection isTop={true} />
    </Container>
  )
}

export default Wishlist