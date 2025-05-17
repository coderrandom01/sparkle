import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { TextFieldBox } from '../../assets/style/index';
interface Iprops {
  placeHolder: string
  name: string
  changeFunction: (e: any) => void
  value: string
  icon: boolean
}
export default function SearchField(props: Iprops) {
  return (
    <TextFieldBox
      //   label= {props.name}
      searchBox
      placeholder={props.placeHolder}
      type="text"
      value={props.value}
      onChange={(e) => props.changeFunction(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}