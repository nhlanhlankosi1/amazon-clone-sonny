import React from "react";
import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  //Grab the session to determine whether the user is logged in or not
  const { data: session } = useSession();
  //Use the NextJS inbuilt router to move between pages i.e. when the amazon icon is clicked go to the root-route
  const router = useRouter();

  //Grab the cart items from the REDUX global store. This will return an array of Product items. In this component, we want to know how many items have been added to the cart so as to update the cart number counter using the cartItems.length
  const cartItems = useSelector(selectItems);

  return (
    <header>
      {/* Top nav */}
      {/* bg-amazon_blue - set the background (bg) to a custom theme (amazon_blue) defined inside tailwind.config.jsm. p-1 - padding of 1px, py-2 - padding in the y direction of 2px*/}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        {/* mt - margin top, sm: flex-grow-0 - after mobile width stop */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          {/* Amazon logo - Here we are using a Next.js <Image /> component. So we need to config the Next.js to allow connections on the links specified in the src. This is done in the next.config.js file. When we click this image, we are going to route to the home page */}
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/* Search */}
        {/* hidden sm:flex - We want the search bar container to be hidden when the screen size is < small and be flex when the size >= small, h-10 - height of 10, rounded-md - round the corners of the search-bar background */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          {/* rounded-l-md - round the left hand side of the input field, focus:outline-none - when in focus, remove the blue outline from the input field px-4 - padding in the x-axis of 4*/}
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* Right side of the screen after the search bar */}
        {/* text-xs - make the text extra small, space-x-6 - space out items in the x-axis, mx-6 - margin in the x-axis, whitespace-nowrap - avoid content from wrapping around */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          {/* Since all 3 divs have the same styles, to avoid repetition they are applied via the ../styles/globals.css file. Add an onClick to the div to initiate Google sign in if there's no session else we need to sign out */}
          <div onClick={!session ? signIn : signOut} className="link">
            <p>{session ? `Hello, ${session.user.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">Accounts & Lists</p>
          </div>

          <div onClick={() => router.push("/orders")} className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            onClick={() => router.push("/checkout")}
            className="relative link flex items-center"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {cartItems.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h6 mr-1" />
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocerys</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Agains</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkits</p>
        <p className="link hidden lg:inline-flex">Health Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
