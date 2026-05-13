import { t } from "@lingui/macro";
import { onError } from "apollo-link-error";
import Router from "next/router";

import { toast } from "@/helpers/toast";

import { expireAuthSession, isAuthSessionError } from "./session";

export const ErrorLink = onError(({ graphQLErrors, networkError }) => {
  try {
    if (isAuthSessionError({ graphQLErrors, networkError })) {
      toast.error(t`Your session has expired. Please sign in again.`);
      expireAuthSession("/login");
      return;
    }

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        console.error({ message, locations, path });
        if (
          extensions?.code === "FORBIDDEN" ||
          message?.includes("Insufficient permission")
        ) {
          if (
            typeof window !== "undefined" &&
            window.location.pathname !== "/403"
          ) {
            const isAdmin = window.location.pathname.startsWith("/manage");
            Router.replace("/403" + (isAdmin ? "?admin=1" : ""));
          }
        }
        if (message === "Error, Unverified account") {
          window.localStorage.clear();
          if (window.location.pathname !== "/") {
            window.location.assign("/");
          }
        } else {
          toast.error(message);
        }
      });
    }

    if (networkError) {
      toast.error(`[Network error]: ${networkError.message || networkError}`);
    }
  } catch (error) {
    toast.error(t`System error! Please try again later.`);
  }
});
