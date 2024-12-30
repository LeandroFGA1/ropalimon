import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { addToCart } from '../store/cartSlice';
import { useDispatch, useSelector } from "react-redux";

const PageCard = () => {
  const location = useLocation();
  const { product } = location.state || {}; 

  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const totalPrice = (Number(product.price) * Number(quantity));

  const isProductInCart = cartItems.some(item => item.name === product.name);

  const handleAddToCart = () => {
    if (!isProductInCart) {
      dispatch(addToCart({ ...product, quantity }));
    } else {
      console.log("Producto ya está en el carrito");
    }
  };

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  // Replace underscores with spaces in the product name
  const productName = product.name.replace(/_/g, ' ');

  return (
    <div className="group border-gray-100/30 flex w-[35%] min-w-[270px] max-w-full flex-col self-center overflow-hidden rounded-lg border bg-main/20 shadow-md">
      <div>
        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl max-w-[800px]">
          <img
            className="peer absolute top-0 right-0 h-full w-full object-cover"
            src={product.image1}
            alt={"producto" + " " + product.name}
          />
          <img
            className="peer peer-hover:right-0 absolute top-0 -right-[800px] h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"
            src={product.image2}
            alt={"producto" + product.name}
          />
        </div>
        <div className="mt-4 px-5 pb-5">
          <div>
            <span className="text-green-400"><strong>{product.brand}</strong></span>
            <span className="text-red-200"><strong> {product.category}</strong></span>
            <h5 className="text-xl tracking-tight">{productName}</h5>
          </div>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <span className="text-3xl font-bold">${totalPrice}</span>
            <div className="flex items-center">
              <Button
                className="px-4 py-2 text-white rounded-full"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="mx-4 text-xl">{quantity}</span> 
              <Button
                className="px-4 py-2 text-white rounded-full"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <Button
          className="bg-green-500 w-[70%] text-white"
          onClick={handleAddToCart} 
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
};

export default PageCard;
