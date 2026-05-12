import { t, Trans } from "@lingui/macro";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import * as Yup from "yup";

import FormikTextField from "@/components-shared/FormikTextField";
import { toast } from "@/helpers/toast";
import { UserService } from "@/services/user/user.repo";
import { useLoadingStore } from "@/stores/loadingStore";

import { ScreenView } from "..";

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .length(6, t`Verification code must be 6 digits`)
    .matches(/^\d{6}$/, t`Please enter only numbers`)
    .required(t`Verification code is required`),
});

const VerifyEmailForm: React.FC<{
  onScreen: (e: ScreenView) => void;
  onClose: () => void;
}> = ({ onScreen, onClose }) => {
  const { setLoading } = useLoadingStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(51);

  useEffect(() => {
    const emailParam = router.query.email as string;
    if (emailParam) setEmail(emailParam);
  }, [router.query.email]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (
    values: { code: string },
    { setSubmitting }: any
  ) => {
    try {
      setLoading(true);
      await UserService.verifyResetCode({
        email,
        code: values.code,
      });
      toast.success(t`Code verified successfully!`);
      router.push(
        {
          pathname: router.pathname,
          query: {
            email,
            code: values.code,
          },
        },
        undefined,
        { shallow: true }
      );
      onScreen("reset-password");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || t`Invalid verification code`
      );
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div
      className="relative flex py-10 items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #3b82f6 40%, #6366f1 100%)",
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
      <div className="container max-w-md mx-auto p-6">
        <div className="rounded-xl bg-black/50 p-8 shadow-lg border border-white/20">
          <h1 className="mb-4 text-4xl font-bold text-white text-center">
            <Trans>Enter Email Code</Trans>
          </h1>
          <p className="mb-6 text-center text-white/90">
            <Trans>We&apos;ve sent a code to {email}</Trans>
          </p>

          <Formik
            initialValues={{ code: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, errors }) => (
              <Form className="flex flex-col gap-6">
                <FormikTextField
                  name="code"
                  label={t`Verification Code`}
                  icon={<MdEmail className="text-white/70" />}
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

                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !values.code ||
                    values.code.length !== 6 ||
                    !!errors.code
                  }
                  className={`w-full rounded-xl py-3 font-semibold shadow-md transition 
                    ${
                      values.code && values.code.length === 6 && !errors.code
                        ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800"
                        : "bg-gray-600 text-white cursor-not-allowed opacity-50"
                    }`}
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
                        <Trans>Verifying...</Trans>
                      </span>
                    </div>
                  ) : (
                    <Trans>Next</Trans>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center text-white/80 space-y-3">
            <div>
              <Trans>Didn&apos;t receive anything?</Trans>{" "}
              {countdown > 0 ? (
                <span className="text-gray-400">
                  <Trans>Resend code ({countdown})</Trans>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await UserService.resetPassword({ email });
                      toast.success(t`Verification code resent!`);
                      setCountdown(51);
                    } catch {
                      toast.error(t`Failed to resend code`);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="underline hover:text-gray-300"
                >
                  <Trans>Resend code</Trans>
                </button>
              )}
            </div>

            <div>
              <Trans>Unable to verify?</Trans>{" "}
              <button
                onClick={() => onScreen("forgot-password")}
                className="underline hover:text-gray-300"
              >
                <Trans>Back</Trans>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
