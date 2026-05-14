import { ClearAuthToken } from "./auth";

const AUTH_STORAGE_KEY = "auth-storage";

const AUTH_ERROR_CODES = new Set([
  "UNAUTHENTICATED",
  "UNAUTHORIZED",
  "TOKEN_EXPIRED",
  "JWT_EXPIRED",
  "401",
]);

const AUTH_ERROR_MESSAGES = [
  "jwt expired",
  "token expired",
  "expired token",
  "invalid token",
  "jwt malformed",
  "invalid signature",
  "unauthenticated",
  "unauthorized",
  "authentication required",
  "session expired",
];

type ErrorLike = {
  message?: string;
  statusCode?: number;
  status?: number;
  extensions?: {
    code?: string;
    statusCode?: number;
  };
  graphQLErrors?: ErrorLike[];
  networkError?: ErrorLike;
};

function collectErrorDetails(error: unknown) {
  const messages: string[] = [];
  const codes: string[] = [];
  const statuses: number[] = [];

  const visit = (value: unknown) => {
    if (!value || typeof value !== "object") return;

    const item = value as ErrorLike;
    if (item.message) messages.push(item.message.toLowerCase());
    if (item.extensions?.code) codes.push(item.extensions.code);
    if (item.extensions?.statusCode) statuses.push(item.extensions.statusCode);
    if (item.statusCode) statuses.push(item.statusCode);
    if (item.status) statuses.push(item.status);

    item.graphQLErrors?.forEach(visit);
    visit(item.networkError);
  };

  visit(error);

  return { messages, codes, statuses };
}

export function isAuthSessionError(error: unknown) {
  const { messages, codes, statuses } = collectErrorDetails(error);

  return (
    statuses.includes(401) ||
    codes.some((code) => AUTH_ERROR_CODES.has(code.toUpperCase())) ||
    messages.some((message) =>
      AUTH_ERROR_MESSAGES.some((authMessage) => message.includes(authMessage))
    )
  );
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;

  ClearAuthToken();
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
}

export function expireAuthSession(redirectTo = "/login") {
  if (typeof window === "undefined") return;

  clearAuthSession();

  if (window.location.pathname !== redirectTo) {
    window.location.assign(redirectTo);
  }
}

export function getSafeApiErrorMessage() {
  return "We could not complete this request. Please try again.";
}
