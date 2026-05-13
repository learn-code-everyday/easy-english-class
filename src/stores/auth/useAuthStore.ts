import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User } from "@/services/user/user.model";

import * as actions from "./actions";
import { AuthStatuses } from "./types";

interface AuthState {
  auth?: User;
  authStatus: AuthStatuses;
  loading: boolean;
  verifiedToken?: string;
  setLoading: (loading: boolean) => void;
  setAuth: (auth?: User) => void;
  setAuthStatus: (status: AuthStatuses) => void;
  setVerifiedToken: (token?: string) => void;
  loadProfile: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authStatus: AuthStatuses.NEW,
      auth: undefined,
      loading: false,
      verifiedToken: undefined,

      setLoading: (loading) => set({ loading }),
      setAuth: (auth) => set({ auth }),
      setAuthStatus: (status) => set({ authStatus: status }),
      setVerifiedToken: (verifiedToken) => set({ verifiedToken }),

      loadProfile: async () => {
        await actions.loadProfile();
      },

      login: actions.login,

      logout: () => {
        actions.logout();
        set({
          auth: undefined,
          authStatus: AuthStatuses.NEW,
          verifiedToken: undefined,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        auth: state.auth,
      }),
    }
  )
);
