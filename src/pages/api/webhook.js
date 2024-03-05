// This file enables us to listen to Stripe checkout events
import { buffer } from "micro";
import * as admin from "firebase-admin";

//Get the permission file to enable webhooks to be able to write to our backend which is firebase. This file is generated in project settings/serviceaccounts
const serviceAccount = require("../../../permissions.json");
//initialise the App if it is NOT already initialised other use the already initialised app
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app;

// Establish a connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

//Fulfil the order
const fulfillOrder = async (session) => {
  console.log("Fulfilling order", session);

  app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} has been added to DB`);
    })
    .catch((err) => {
      console.log(`FAILURE: Failed to add Order ${session.id} to the DB`);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const signature = req.headers["stripe-signature"];

    let event;

    //Verify that the EVENT posted came from Stripe
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log("ERROR", err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    //If we reach this point, it means the event is legit, so we need handle the checkout.session.completed event and store the metadata about the order in our Firebase database
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      //Fulfill the order here
      return fulfillOrder(session)
        .then(() => res.staus(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

//Configure this endpoint
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
