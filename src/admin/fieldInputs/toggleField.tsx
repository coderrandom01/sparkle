import { FormControlLabel, styled, Switch } from "@mui/material";
import React from "react";
const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: 48,
    height: 24,
    padding: 0,
    display: 'flex',
    '& .MuiSwitch-switchBase': {
      padding: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(24px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#FE8315', // Green when on
          opacity: 1,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      width: 20,
      height: 20,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    '& .MuiSwitch-track': {
      borderRadius: 12,
      backgroundColor: '#ccc', // Gray when off
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 300,
      }),
    },
  }));
export function ToggleField(props : any) {
  return (
    <div className = "my-5">

<CustomSwitch checked={props.isOn} onChange={props.handleToggle} disabled={props.disable} />
    </div>
);
};
