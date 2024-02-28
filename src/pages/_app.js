import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

//In this file, we give access to the authetication state of the user throughtout the whole app by wrapping the <Provider /> inside the <SessionProvider />. When we do this, the rest of the app now has access to the login session of the user. We then move to Header.js to grab a session hook, session via useSession from NextJS auth
const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
