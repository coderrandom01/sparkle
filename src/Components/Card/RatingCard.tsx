import { Card, CardContent, Rating } from "@mui/material";
import React from "react";

interface ProductImageProps {
  name: string;
  rating: any;
  message: string;
}

function RatingCard({ name, rating, message }: ProductImageProps) {
  return (
    <Card sx={{ borderRadius: '18px' }}>
      <CardContent className="space-y-2">
        <p className="font-medium text-base mb-0">{name}</p>
        <Rating defaultValue={rating} readOnly size="small" precision={0.5}/>
        <p className="text-xs">{message}</p>
      </CardContent>
    </Card>
  );
}

export default RatingCard;
