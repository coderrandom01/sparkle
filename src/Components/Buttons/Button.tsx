import { Button } from '@mui/material';
import React from 'react';

export function LargeButtonArrow() {
  return (
    <button className='flex items-center justify-center text-primary text-xs md:text-sm p-1.5 px-2 md:px-3 border border-primary rounded hover:bg-primary hover:text-white'>
        <span>
            View more
        </span>
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap='round' strokeLinejoin="round" className="lucide lucide-arrow-right">
            <path d="M5 12h16"/>
            <path d="m16 7 5 5-5 5"/>
        </svg>
        </span>
    </button>  
  )
}

interface outlinedButtonProps {
  name: string,
  handleClick: Function,
  propoerty?: any
}

export function OutlinedButton({ name, handleClick, propoerty } : outlinedButtonProps){
    return(
      <Button classes={{
        icon: 'text-xs sm:text-base !mr-4'
      }} loading={propoerty?.isLoader || false } loadingPosition="start" startIcon={propoerty?.isStartIcon || null} disabled={propoerty?.isDisable || false} variant='outlined' onClick={() =>handleClick()} className='!border-primary !text-black !px-2 sm:!px-8 !text-xs sm:!text-sm !capitalize hover:bg-primary hover:!text-white'>{name}</Button>
    )
}

export function ContainedButton({ name, handleClick, propoerty } : outlinedButtonProps){
  return(
    <Button classes={{
      icon: 'text-xs sm:text-base !mr-4'
    }} loading={propoerty?.isLoader || false } loadingPosition="start" startIcon={propoerty?.isStartIcon || null} disabled={propoerty?.isDisable || false} variant='outlined' onClick={() =>handleClick()} className='!border-primary !px-8 !capitalize !bg-primary !text-white hover:!bg-transparent hover:!text-black'>{name}</Button>
  )
}