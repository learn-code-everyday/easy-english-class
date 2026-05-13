import { User } from "@/services/user/user.model";

export enum AuthStatuses {
  NEW = "NEW",
  LOADING = "LOADING",
  LOADED = "LOADED",
}

export interface AuthState {
  authStatus: AuthStatuses;
  auth?: User;
  loading: boolean;
  verifiedToken?: string;

  loadProfile: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setAuth: (auth?: User) => void;
  setAuthStatus: (status: AuthStatuses) => void;
  setLoading: (loading: boolean) => void;
  setVerifiedToken: (token?: string) => void;
}
