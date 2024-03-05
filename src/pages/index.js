import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/react";

export default function Home({ products }) {
  //N.B - here the "products" are passed in as props (here they are destructured) from an API call triggered by the function getServerSideProps() below
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />

      {/* max-w-screen-2xl mx-auto - this is to make sure that the page has a max width, nomatter how large the screen on which it is rendered on is */}
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* Product Feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

//Server-side render: this function triggers Next.js to automatically render the web page server side before sending the page back to the client. In this case we are returning products from the fakestoreapi.
export async function getServerSideProps(context) {
  //This is a trick to get rid of a little glitch on the Header when refreshing (the glitch was showing "Login" even when the user is logged in)
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
      session
    },
  };
}
