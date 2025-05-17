import { Divider } from "@mui/material";
import { bageImg, dayReturnImg, payementImg } from "config/property/image-property";
import React from "react";

function InstructSection({ isTop= false, isBottom = false }: { isTop?: boolean, isBottom?: boolean }) {
  return (
    <>
      { isTop && (<Divider sx={{ borderWidth: 1, my: 3 }} />) }
      <div className="grid sm:grid-cols-3 gap-5 sm:gap-3 w-full">
        <div className="step-action-div">
          <img src={bageImg} alt="badge" />
          <h5>Premium Quality</h5>
          <p>All the clothing products are made from 100% premium quality fabric.</p>
        </div>
        <div className="step-action-div">
          <img src={payementImg} alt="payment" />
          <h5>Secure Payments</h5>
          <p>Highly Secured SSL-Protected Payment Gateway.</p>
        </div>
        <div className="step-action-div">
          <img src={dayReturnImg} alt="day_return" />
          <h5>7 Days Return</h5>
          <p>Return or exchange the orders within 7 days of delivery.</p>
        </div>
      </div>
      { isBottom && (<Divider sx={{ borderWidth: 1, my: 3 }} />) }
    </>
  );
}

export default InstructSection;
