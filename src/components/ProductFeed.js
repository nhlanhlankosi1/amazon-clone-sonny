import React from "react";
import Product from "./Product";

function ProductFeed({ products }) {
  return (
    // grid grid-flow-row-dense - these classes apply the grid layout, the products should densely populate the given field, md:grid-cols-2 - from medium screen size and above use a 2 column-grid, lg:grid-cols-3 - from large use a 3 col-grid, xl:grid-cols-4 - from xlarge use a 4 col grid, md:-mt-52 - for medium screens and above change margin top to -52 to make the items "move into" the banner on top, mx-auto - to center the screen items nicely
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {/*Get the products passed in from the FakestoreAPI call in index.js function getServerSideProps(). Map through these products and destructure the product object to get the properties of the object (id, title, price e.t.c). We are going to be showing the first 4 before the banner for the advert and we going to show the rest after the advert banner*/}
      {products
        .slice(0, 4)
        .map(({ id, title, price, description, category, image }) => {
          return (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          );
        })}

      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt="An ad banner"
      />

      {/* To add more style to the products feed. One product will take up more space that the other ones. This will be product 4 in this case. The product will be shown after the advert banner.*/}
      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, price, description, category, image }) => {
            return (
              <Product
                key={id}
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
              />
            );
          })}
      </div>

      {/* Show the rest of the products from product 5 . This happens after the product which is */}
      {products
        .slice(5, products.length)
        .map(({ id, title, price, description, category, image }) => {
          return (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          );
        })}
    </div>
  );
}

export default ProductFeed;
