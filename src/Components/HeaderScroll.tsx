import React from 'react'
import { Slide, useScrollTrigger } from "@mui/material";


interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number }>;
}

export function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 2 : 0,
      })
    : null;
}


export function HideOnScroll(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        <div style={{ display: trigger ? "none" : "block" }}>{children ?? <></>}</div>
      </Slide>
    );
  }