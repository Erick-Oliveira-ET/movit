import { appWithTranslation } from "next-i18next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/global.css";

import * as gtag from "../lib/ga";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", (url: URL) => {
      gtag.pageView(url);
    });
    return () => {
      router.events.off("routeChangeComplete", (url: URL) => {
        gtag.pageView(url);
      });
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
