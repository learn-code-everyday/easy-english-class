import { t, Trans } from "@lingui/macro";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import PasswordIcon from "@mui/icons-material/Lock";
import {
  IconButton,
  Stack,
  Typography,
  Divider,
  Checkbox,
  TextField,
  InputAdornment,
  useMediaQuery,
  FormControlLabel,
} from "@mui/material";
import { Formik, Form } from "formik";
import Image from "next/image";
import React from "react";
import * as Yup from "yup";

import { toast } from "@/helpers/toast";
import { UserService } from "@/services/user/user.repo";

import { ScreenView } from ".";

const TERMS_URL = `${process.env.NEXT_PUBLIC_BRAND_WEBSITE_URL}/terms`;
const PRIVACY_URL = `${process.env.NEXT_PUBLIC_BRAND_WEBSITE_URL}/privacy`;

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required(t`Please enter your name`),
  email: Yup.string()
    .email(t`Invalid email`)
    .required(t`Please enter your email`),
  password: Yup.string()
    .min(6, t`Password must be at least 6 characters`)
    .required(t`Please enter your password`),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], t`Passwords do not match`)
    .required(t`Please confirm your password`),
  terms: Yup.bool().oneOf([true], t`Please accept Terms and Conditions`),
  privacy: Yup.bool().oneOf([true], t`Please accept Privacy Policy`),
});

export default function RegisterForm({
  onScreen,
  onClose,
}: {
  onScreen: (e: ScreenView) => void;
  onClose: () => void;
}) {
  const isMobile = useMediaQuery("(max-width:900px)");

  const onLoginWithGoogle = () => {
    const origin = window.location.origin;
    window.location.href = `/api/google?origin=${encodeURIComponent(origin)}`;
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      width="100%"
      sx={{
        position: "relative",
        maxWidth: 830,
        mx: "auto",
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 14,
          right: 14,
          color: "#fff",
          bgcolor: "rgba(255,255,255,0.08)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.13)" },
          zIndex: 10,
        }}
        aria-label={t`Close`}
      >
        <CloseIcon />
      </IconButton>

      {/* Left: Form */}
      <Stack
        sx={{
          px: { xs: 2, sm: 4, md: 5 },
          py: { xs: 2.5, sm: 6, md: 7 },
          width: { xs: "100%", md: "60%" },
          bgcolor: "transparent",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Logo mobile */}
        <Stack display={{ xs: "flex", md: "none" }} alignItems="center" mb={2}>
          <Image
            width={120}
            height={80}
            src="/logo.png"
            alt="Brand Logo"
            style={{ marginBottom: 4 }}
          />
        </Stack>
        <Typography
          fontSize={{ xs: 26, sm: 32, md: 36 }}
          fontWeight={700}
          lineHeight={1.2}
          color="white"
          textAlign="center"
          mb={2}
          sx={{ textShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
        >
          {t`Sign up to create an Account`}
        </Typography>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
            privacy: false,
          }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              const data = {
                name: values.name,
                email: values.email,
                password: values.password,
              };
              await UserService.create({ data });
              toast.success(
                t`Registration successful! Welcome to English Class!`
              );
              onScreen("login");
            } catch (error: any) {
              toast.error(error || t`Registration failed. Please try again.`);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
          }) => (
            <Form
              style={{
                width: "100%",
                maxWidth: 420,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <button
                type="button"
                className="w-full rounded-md bg-white py-3 font-bold text-indigo-600 flex items-center justify-center gap-2 hover:bg-indigo-50 transition"
                onClick={onLoginWithGoogle}
                disabled={isSubmitting}
              >
                <GoogleIcon style={{ fontSize: 20 }} />
                {t`Sign in With Google`}
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Divider
                  sx={{
                    flex: 1,
                    borderColor: "rgba(255,255,255,0.6)",
                    alignSelf: "center",
                  }}
                />
                <Typography
                  sx={{
                    color: "#fff",
                    px: 2,
                    fontSize: 15,
                    userSelect: "none",
                    fontWeight: 500,
                  }}
                >
                  {t`or`}
                </Typography>
                <Divider
                  sx={{
                    flex: 1,
                    borderColor: "rgba(255,255,255,0.6)",
                    alignSelf: "center",
                  }}
                />
              </div>

              {/* Full Name */}
              <TextField
                variant="outlined"
                label={t`Full Name`}
                name="name"
                autoComplete="name"
                style={{ background: "rgba(255, 255, 255, 0.1)" }}
                className="w-full rounded-md"
                InputLabelProps={{ style: { color: "rgba(255,255,255,0.85)" } }}
                InputProps={{
                  style: { color: "white" },
                }}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />

              {/* Email */}
              <TextField
                variant="outlined"
                label={t`Email`}
                name="email"
                autoComplete="email"
                style={{ background: "rgba(255, 255, 255, 0.1)" }}
                className="w-full rounded-md"
                InputLabelProps={{ style: { color: "rgba(255,255,255,0.85)" } }}
                InputProps={{
                  style: { color: "white" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon className="text-white" />
                    </InputAdornment>
                  ),
                }}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              {/* Password */}
              <TextField
                variant="outlined"
                label={t`Password`}
                name="password"
                type="password"
                autoComplete="new-password"
                style={{ background: "rgba(255, 255, 255, 0.1)" }}
                className="w-full rounded-md"
                InputLabelProps={{ style: { color: "rgba(255,255,255,0.85)" } }}
                InputProps={{
                  style: { color: "white" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <PasswordIcon className="text-white" />
                    </InputAdornment>
                  ),
                }}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              {/* Confirm Password */}
              <TextField
                variant="outlined"
                label={t`Confirm Password`}
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                style={{ background: "rgba(255, 255, 255, 0.1)" }}
                className="w-full rounded-md"
                InputLabelProps={{ style: { color: "rgba(255,255,255,0.85)" } }}
                InputProps={{
                  style: { color: "white" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <PasswordIcon className="text-white" />
                    </InputAdornment>
                  ),
                }}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />

              {/* Terms & Privacy */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginTop: 8,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="terms"
                      color="default"
                      checked={values.terms}
                      onChange={handleChange}
                      sx={{ "&:hover": { bgcolor: "transparent" } }}
                      disableRipple
                    />
                  }
                  label={
                    <Typography className="text-white text-sm">
                      <Trans>
                        I accept the{" "}
                        <a
                          className="text-[#fc9a14] underline hover:text-yellow-400 transition"
                          target="_blank"
                          href={TERMS_URL}
                          rel="noreferrer"
                        >
                          Terms and Conditions
                        </a>
                      </Trans>
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="privacy"
                      color="default"
                      checked={values.privacy}
                      onChange={handleChange}
                      sx={{ "&:hover": { bgcolor: "transparent" } }}
                      disableRipple
                    />
                  }
                  label={
                    <Typography className="text-white text-sm">
                      <Trans>
                        I agree to the{" "}
                        <a
                          className="text-[#fc9a14] underline hover:text-yellow-400 transition"
                          target="_blank"
                          href={PRIVACY_URL}
                          rel="noreferrer"
                        >
                          Privacy Policy
                        </a>
                      </Trans>
                    </Typography>
                  }
                />
                {/* Error messages for checkbox */}
                {touched.terms && errors.terms && (
                  <Typography color="error" fontSize={12}>
                    {errors.terms}
                  </Typography>
                )}
                {touched.privacy && errors.privacy && (
                  <Typography color="error" fontSize={12}>
                    {errors.privacy}
                  </Typography>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-md bg-white py-3 font-bold text-indigo-600 flex items-center justify-center gap-2 transition ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-50 cursor-pointer"
                }`}
              >
                {isSubmitting ? t`Registering...` : t`Register`}
              </button>
              {/* Login link on mobile */}
              {isMobile && (
                <Typography color="white" textAlign="center" sx={{ mt: 2 }}>
                  <Trans>Already have an account?</Trans>
                  <span
                    className="ml-2 text-[17px] font-medium text-[#fc9a14] hover:text-yellow-400 transition cursor-pointer"
                    onClick={() => onScreen("login")}
                  >
                    <Trans>Login</Trans>
                  </span>
                </Typography>
              )}
            </Form>
          )}
        </Formik>
      </Stack>

      {/* Right: Welcome section, only on desktop */}
      <Stack
        display={{ xs: "none", md: "flex" }}
        sx={{
          width: { md: "40%" },
          minHeight: 540,
          bgcolor: "transparent",
          color: "#fff",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
          py: 5,
          textAlign: "center",
          gap: 3,
        }}
      >
        <Image
          width={160}
          height={100}
          src="/logo.png"
          alt="Brand Logo"
          className="drop-shadow-[0_4px_8px_rgba(255,255,255,0.5)]"
        />
        <Typography fontSize={34} fontWeight="bold">
          {t`Welcome Back!`}
        </Typography>
        <Typography maxWidth={320}>
          <Trans>
            Already a member? Log in and enjoy your AI shopping experience with
            your personalized dashboard, rewards, and more.
          </Trans>
        </Typography>
        <button
          className="w-full rounded-md bg-white py-3 font-bold text-indigo-600 flex items-center justify-center gap-2 hover:bg-indigo-50 transition"
          onClick={() => onScreen("login")}
        >
          {t`Login`}
        </button>
      </Stack>
    </Stack>
  );
}
