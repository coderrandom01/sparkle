import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { TextFieldBox } from '../../assets/style/index';
interface Iprops {
  placeHolder?: string
  name: string
  changeFunction: any
  value: string
  icon?: boolean
  type: string
  label: string
}
export default function TextField(props: Iprops) {
  return (
    <TextFieldBox
      label={props.label}
      name={props.name}
      Text
      placeholder={props.placeHolder}
      type={props.type}
      value={props.value}
      onChange={props.changeFunction}
    />
  );
}