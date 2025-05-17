import React, { useState } from 'react'
import './input.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
interface TextFieldWithLabelProps  { 
  label: string, type: string, handleOnChange: Function, placeHolder?: string , name? : string,errors? : string,icon?: boolean
}

export function TextFieldWithLabel({ label, type, handleOnChange, placeHolder= '',name,errors,icon } : TextFieldWithLabelProps) {
  const [passwordVisible ,setPasswordVisible] = useState<boolean>(false)
  const visible = () => {
    setPasswordVisible(!passwordVisible)
  }
  return (
    <div className='form-control'>
      <label>{label}</label>
      {icon ? 
      <div className = "relative">
      <input className='w-full' type={passwordVisible ? "password" : "text"} id={type} name = {name} placeholder={placeHolder} onChange={(e) => handleOnChange(e)} />
      {passwordVisible ? <VisibilityIcon className='passwordVisible cursor-pointer' onClick = {() => visible()}/> : <VisibilityOffIcon className='passwordVisible cursor-pointer' onClick = {() => visible()}/>  } 
      </div> : 
      <input id={type} type={type} name = {name} placeholder={placeHolder} onChange={(e) => handleOnChange(e)} />
      }
     {errors &&
     <p className="errorText" style={{ color: "red" }}>{errors}</p>
     } 
    </div>
  )
}