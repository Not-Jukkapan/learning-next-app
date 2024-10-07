import React from "react";

const ProductCard = () => {
  return (
    <div>
      <button
        onClick={() => {
          console.log("clicked");
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
