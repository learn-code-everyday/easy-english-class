import { t, Trans } from "@lingui/macro";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import { IconButton, Stack } from "@mui/material";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";

import FormikTextField from "@/components-shared/FormikTextField";
import { toast } from "@/helpers/toast";
import { UserService } from "@/services/user/user.repo";
import { useLoadingStore } from "@/stores/loadingStore";

import { ScreenView } from "..";

export const dynamic = "force-dynamic";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(t`Invalid email`)
    .required(t`Enter your email`),
});

type Props = {
  onScreen: (e: ScreenView) => void;
  onClose: () => void;
};

const ForgotPasswordForm: React.FC<Props> = ({ onScreen, onClose }) => {
  const router = useRouter();
  const { setLoading } = useLoadingStore();

  return (
    <Stack
      width="100%"
      sx={{
        position: "relative",
        mx: "auto",
        padding: 5,
      }}
    >
      {/* Close button: always top-right */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          color: "#fff",
          bgcolor: "rgba(255,255,255,0.08)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.13)" },
          zIndex: 10,
        }}
        aria-label={t`Close`}
      >
        <CloseIcon />
      </IconButton>
      <div className="flex flex-col items-center justify-center w-full text-center">
        <p className="pt-[30px] text-2xl sm:text-4xl md:text-[50px] text-white font-semibold">
          <Trans>Yo! Forgot Your Password?</Trans>
        </p>
        <span className="text-md sm:text-xl md:text-[30px] text-white max-w-md mt-4">
          <Trans>
            No worries! Enter your email and we will send you a reset
          </Trans>
        </span>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setLoading(true);
              await UserService.resetPassword({ email: values.email });
              toast.success(t`Email sent successfully!`);
              router.push(
                {
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    email: values.email,
                  },
                },
                undefined,
                { shallow: true }
              );
              onScreen("verify-email");
            } catch (error: any) {
              toast.error(
                error?.response?.data?.message || t`Failed to send reset email`
              );
            } finally {
              setLoading(false);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="mt-5 md:mt-10 flex w-full max-w-[460px] flex-col gap-6 p-6 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg"
            >
              <Stack className="w-full items-center gap-6 sm:w-[420px]">
                <div className="w-full text-start">
                  <FormikTextField
                    name="email"
                    label={t`Email`}
                    icon={<EmailIcon className="text-white/70" />}
                    InputLabelProps={{
                      style: { color: "rgba(255,255,255,0.8)" },
                    }}
                    inputProps={{ className: "text-white" }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.6)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#A78BFA",
                          borderWidth: 2,
                        },
                        color: "white",
                      },
                      "& input": {
                        color: "white",
                      },
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded-xl py-3 text-white font-semibold shadow-md transition
                bg-gradient-to-r from-blue-600 to-indigo-700
                hover:from-blue-700 hover:to-indigo-800
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>
                        <Trans>Sending...</Trans>
                      </span>
                    </div>
                  ) : (
                    <Trans>Send Request</Trans>
                  )}
                </button>
              </Stack>
            </form>
          )}
        </Formik>

        <button
          className="mt-4 text-white underline hover:text-gray-300"
          onClick={() => onScreen("login")}
        >
          <Trans>Back to Login</Trans>
        </button>
      </div>
    </Stack>
  );
};

export default ForgotPasswordForm;
