import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { CacheProvider, EmotionCache } from "@emotion/react";
import { AppProps } from "next/app";
import React, { Fragment, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";

import SeoHead from "@/components/SeoHead";
import { GetAuthToken } from "@/graphql/auth";
import AppProviders from "@/providers/app-provider";
import { AuthStatuses } from "@/stores/auth/types";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import createEmotionCache from "@/utils/createEmotionCache";

type NextPageWithLayout = AppProps["Component"] & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
  Layout?: React.ComponentType<any>;
  LayoutProps?: Record<string, any>;
  emotionCache?: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

function MyApp(props: AppProps & { emotionCache?: EmotionCache }) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const { auth, authStatus, loadProfile, setAuth, setVerifiedToken } =
    useAuthStore();
  const token = GetAuthToken();
  const loadedTokenRef = useRef<string>("");

  const Layout = (Component as NextPageWithLayout).Layout || Fragment;
  const layoutProps = (Component as NextPageWithLayout).LayoutProps || {};

  const getLayout =
    (Component as NextPageWithLayout).getLayout || ((page) => page);

  useEffect(() => {
    if (!token && auth) {
      setAuth(undefined);
      setVerifiedToken(undefined);
      loadedTokenRef.current = "";
      return;
    }

    if (
      token &&
      loadedTokenRef.current !== token &&
      authStatus !== AuthStatuses.LOADING
    ) {
      loadedTokenRef.current = token;
      loadProfile();
    }
  }, [auth, authStatus, token, loadProfile, setAuth, setVerifiedToken]);

  return (
    <CacheProvider value={emotionCache}>
      <AppProviders>
        <SeoHead />

        <Layout {...layoutProps}>
          {getLayout(<Component {...pageProps} />)}
        </Layout>

        <ToastContainer position="top-right" autoClose={3000} />
      </AppProviders>
    </CacheProvider>
  );
}

export default MyApp;
