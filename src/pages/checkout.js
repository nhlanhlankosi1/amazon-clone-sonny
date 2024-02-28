import Image from "next/image";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";

function Checkout() {
  //Grab the cart items from the REDUX global store. This will return an array of Product items. In this component, we want to render the items in the cart
  const cartItems = useSelector(selectItems);
  //Grab the session to determine whether the user is logged in or not
  const { data: session } = useSession();

  //Get the total price from REDUX
  const totalPrice = useSelector(selectTotal);

  return (
    <div className="bg-gray-100">
      <Header />

      {/* max-w-screen-2xl mx-auto - this is to make sure that the page has a max width, nomatter how large the screen on which it is rendered on is. On a larger screen though we need to have flex to make sure that the two panels (Cart items and total price summary) are side to side */}
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left hand section: Cart items */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
            className="cursor-pointer"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {cartItems.length === 0
                ? "Your Shopping Basket is Empty"
                : "Shopping Basket"}
            </h1>

            {cartItems.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>

        {/* Right hand section: Total cart price  */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {cartItems.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({cartItems.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={totalPrice} currency="GBP" />
                </span>
              </h2>

              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
