import { GetAuthToken, SetAuthToken } from "@/graphql/auth";
import { clearAuthSession, isAuthSessionError } from "@/graphql/session";
import { toast } from "@/helpers/toast";
import { UserService } from "@/services/user/user.repo";

import { AuthStatuses } from "./types";
import { useLoadingStore } from "../loadingStore";
import { useAuthStore } from "./useAuthStore";

export async function loadProfile() {
  const setLoading = useLoadingStore.getState().setLoading;
  const setAuth = useAuthStore.getState().setAuth;
  const setAuthStatus = useAuthStore.getState().setAuthStatus;

  try {
    setLoading(true);
    setAuthStatus(AuthStatuses.LOADING);

    const token = GetAuthToken();
    if (token) {
      const result = await UserService.userGetMe(token);
      setAuth(result.data.userGetMe);
    }

    setAuthStatus(AuthStatuses.LOADED);
  } catch (error) {
    console.error(error);
    if (isAuthSessionError(error)) {
      clearAuthSession();
      setAuth(undefined);
    }
    setAuthStatus(AuthStatuses.LOADED);
  } finally {
    setLoading(false);
  }
}

export async function login(email: string, password: string) {
  const setLoading = useLoadingStore.getState().setLoading;
  const setAuth = useAuthStore.getState().setAuth;
  const setAuthStatus = useAuthStore.getState().setAuthStatus;

  try {
    setLoading(true);
    setAuthStatus(AuthStatuses.LOADING);

    const result = await UserService.signInUserByEmail(email, password);
    const { token } = result;
    SetAuthToken(token);

    const profileResult = await UserService.userGetMe();
    const user = profileResult.data.userGetMe;
    setAuth(user);

    window.location.assign("/manage/dashboard");

    toast.success("Login successfully");
    setAuthStatus(AuthStatuses.LOADED);
    return user;
  } catch (error: any) {
    toast.error(error?.message ?? "Login failed");
    setAuthStatus(AuthStatuses.LOADED);
  } finally {
    setLoading(false);
  }
}

export function logout() {
  clearAuthSession();
  window.location.assign("/");
}
