import React from 'react';
import './input.css'

export function InputNumber({ value, addQuanity, removeQuanity } : { value: number, addQuanity: Function, removeQuanity: Function }) {
  return (
    <div className='flex space-x-2 items-center text-xs'>
        <button className='button-minus-plus' onClick={()=>removeQuanity()}>-</button>
        <div className='bg-slate-200 flex items-center justify-center p-0.5 px-5 rounded-sm '>{value}</div>
        <button className='button-minus-plus' onClick={()=>addQuanity()}>+</button>
    </div>
  )
}
