import { t } from "@lingui/macro";

import { GetAuthToken, SetAuthToken } from "@/graphql/auth";
import { clearAuthSession, expireAuthSession } from "@/graphql/session";
import { toast } from "@/helpers/toast";
import { UserService } from "@/services/user/user.repo";

import { AuthStatuses } from "./types";
import { useLoadingStore } from "../loadingStore";
import { useAuthStore } from "./useAuthStore";

export async function loadProfile() {
  const setLoading = useLoadingStore.getState().setLoading;
  const setAuth = useAuthStore.getState().setAuth;
  const setAuthStatus = useAuthStore.getState().setAuthStatus;
  const setVerifiedToken = useAuthStore.getState().setVerifiedToken;

  try {
    setLoading(true);
    setAuthStatus(AuthStatuses.LOADING);

    const token = GetAuthToken();
    if (token) {
      const result = await UserService.userGetMe(token);
      setAuth(result.data.userGetMe);
      setVerifiedToken(token);
    } else {
      setAuth(undefined);
      setVerifiedToken(undefined);
    }

    setAuthStatus(AuthStatuses.LOADED);
  } catch (error) {
    console.error(error);
    clearAuthSession();
    setAuth(undefined);
    setVerifiedToken(undefined);
    setAuthStatus(AuthStatuses.LOADED);
    expireAuthSession("/login");
  } finally {
    setLoading(false);
  }
}

export async function login(email: string, password: string) {
  const setLoading = useLoadingStore.getState().setLoading;
  const setAuth = useAuthStore.getState().setAuth;
  const setAuthStatus = useAuthStore.getState().setAuthStatus;
  const setVerifiedToken = useAuthStore.getState().setVerifiedToken;

  try {
    setLoading(true);
    setAuthStatus(AuthStatuses.LOADING);

    const result = await UserService.signInUserByEmail(email, password);
    const { token } = result;
    SetAuthToken(token);

    const profileResult = await UserService.userGetMe();
    const user = profileResult.data.userGetMe;
    setAuth(user);
    setVerifiedToken(token);

    window.location.assign("/manage/dashboard");

    toast.success(t`Login successfully`);
    setAuthStatus(AuthStatuses.LOADED);
    return user;
  } catch (error: any) {
    clearAuthSession();
    setAuth(undefined);
    setVerifiedToken(undefined);
    toast.error(error?.message ?? t`Login failed`);
    setAuthStatus(AuthStatuses.LOADED);
  } finally {
    setLoading(false);
  }
}

export function logout() {
  clearAuthSession();
  window.location.assign("/login");
}
