import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  //State for product rating stars
  const [rating] = useState(
    //Create a random number between MIN_RATING and MAX_RATING. This number will be used to randomly set the number of star ratings
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  //State to determine whether the product has Amazon Prime delivery or not. Randomise as well, if the random number is less that 0.5 the it does NOT have Prime delivery
  const [hasPrime] = useState(Math.random() < 0.5);

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit="contain" />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {/* Here we use a trick to randomise the ratings stars. Algorithm: Get the number "rating" from the state, Create an empty array & fill it with the number of elements = rating. Map through this empty array */}
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>

      {/* line-clamp-2 - keep the text to 2 lines and trancate the rest of the text that overflows. This functionality is added as an extension on the Tailwind css config file */}
      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="GBP" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-12"
            src="https://firebasestorage.googleapis.com/v0/b/netflix-clone-f8d43.appspot.com/o/amazon-pay.png?alt=media&token=7b7c1bb6-b43d-4409-9718-d9faa4e770c9"
            alt=""
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      {/* button - custom class defined in styles/globals.css */}
      <button className="mt-auto button">Add To Basket</button>
    </div>
  );
}

export default Product;
