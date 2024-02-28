import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
}) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };

    //At this point we are sending/pushing the product as an action to the REDUX store...the basket slice
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    //Remove the item of id (id) from REDUX store
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      {/* Left Section: Image only */}
      <Image src={image} height={200} width={200} objectFit="contain" />

      {/* Middle Section: Product title, description, price and rating */}
      {/* col-span-3 - because we want the middle section to span across 3 columns out of the five that are there. The left and right sections will each span across one column as a result */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>

        <div className="mb-5">
          <Currency quantity={price} currency="GBP" />
        </div>

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://firebasestorage.googleapis.com/v0/b/netflix-clone-f8d43.appspot.com/o/amazon-pay.png?alt=media&token=7b7c1bb6-b43d-4409-9718-d9faa4e770c9"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      {/* Right Section: Add/Remove products buttons */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        {/* button - custom class defined in styles/globals.css */}
        <button onClick={addItemToBasket} className="mt-auto button">
          Add To Basket
        </button>

        {/* button - custom class defined in styles/globals.css */}
        <button onClick={removeItemFromBasket} className="mt-auto button">
          Remove From Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
