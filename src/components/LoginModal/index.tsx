import { Dialog } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgetPasswordForm from "./ResetPassword/ForgotPasswordForm";
import PasswordSuccess from "./ResetPassword/PasswordSuccess";
import ResetPasswordForm from "./ResetPassword/ResetPasswordForm";
import VerifyEmailForm from "./ResetPassword/VerifyEmailForm";

export type ScreenView =
  | "login"
  | "register"
  | "forgot-password"
  | "verify-email"
  | "reset-password"
  | "password-success";

type LoginModalProps = {
  screenView?: ScreenView;
  open?: boolean; // optional, can manage internally
  onClose: () => void;
};

export default function LoginModal({
  screenView = "login",
  open: controlledOpen,
  onClose,
}: LoginModalProps) {
  const router = useRouter();
  const { screen: screenFromQuery } = router.query;

  const [open, setOpen] = useState<boolean>(controlledOpen ?? false);
  const [screen, setScreen] = useState<ScreenView>(screenView);

  useEffect(() => {
    if (controlledOpen !== undefined) {
      setOpen(controlledOpen);
    }
  }, [controlledOpen]);

  useEffect(() => {
    if (screenFromQuery && typeof screenFromQuery === "string") {
      if (screenFromQuery === "verify-email") {
        setScreen(screenFromQuery as ScreenView);
        setOpen(true);
      }
    }
  }, [screenFromQuery]);

  const handleClose = () => {
    setOpen(false);
    setScreen("login");
    onClose?.();
    router.replace(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Dialog
      key={screen}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          maxWidth: 830,
          borderRadius: 3,
          overflow: "hidden",
          p: 0,
          boxShadow: 12,
          background: "linear-gradient(135deg, #3b82f6 40%, #6366f1 100%)",
        },
      }}
      fullWidth
      scroll="body"
    >
      {screen === "login" && (
        <LoginForm onScreen={setScreen} onClose={handleClose} />
      )}
      {screen === "register" && (
        <RegisterForm onScreen={setScreen} onClose={handleClose} />
      )}
      {screen === "forgot-password" && (
        <ForgetPasswordForm onScreen={setScreen} onClose={handleClose} />
      )}
      {screen === "verify-email" && (
        <VerifyEmailForm onScreen={setScreen} onClose={handleClose} />
      )}
      {screen === "reset-password" && (
        <ResetPasswordForm onScreen={setScreen} onClose={handleClose} />
      )}

      {screen === "password-success" && (
        <PasswordSuccess onScreen={setScreen} />
      )}
    </Dialog>
  );
}
