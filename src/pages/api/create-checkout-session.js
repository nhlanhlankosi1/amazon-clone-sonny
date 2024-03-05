//This is backend code to run the Stripe checkout session
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  //This data is passed from checkout.js method named createCheckoutSession
  const { cartItems, email } = req.body;

  //Stripe expects a certain format of cartItem objects to be passed, so we need transform our objects to match this requirement. Algorithm: Map through the passed in cartItems array and for each object create a transformed cart item object passing in the required values of price_data, description, etc. Note: unit_amount - this is how Stripe receives any currency in its base unit i.e. $ will be received as cents, £ will be received as pennies etc so you need to multiply the price of your items by 100 to get the base currency unit

  const transformedItems = cartItems.map((cartItem) => ({
    quantity: 1,
    price_data: {
      currency: "gbp",
      unit_amount: cartItem.price * 100,
      product_data: {
        name: cartItem.title,
        description: cartItem.description,
        images: [cartItem.image],
      },
    },
  }));

  //Create a Stripe checkout session. So here we are passing in an object which contains the following properties: payment_method_types - an array of payment method types; shipping_rate_data - this is an array containing the shipping rates (amounts) for different destinations. In this array we specify ; shipping_address_collection - in this object we specify info such as the allowed_countries: which specified countries where our products can ship to; line_items - an array of items to be checked out; mode - what the session is all about, in this case we want to make a payment; success_url - this is a url endpoint on our site that the user will be redirected when the payment was successful; cancel_url - this is a url endpoint on our site that the user will be redirected when the payment was cancelled or unsuccessful (in this case the user will be redirected back to the checkout page because that's where the user is coming from.); metadata - any additional data that will be sent to the Stripe session, in this case we pass in the user's email and the cartItems images (we stringify this array to make it passable throughout )

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // shipping_rates: ["shr_1Op5AWBLTiI62cMLLEO9x9zb"],
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 699,
            currency: "gbp",
          },
          display_name: "Next day shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(cartItems.map((cartItem) => cartItem.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
