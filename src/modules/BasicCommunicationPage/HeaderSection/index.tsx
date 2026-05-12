"use client";

import { Trans } from "@lingui/macro";
import { Typography } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const HeaderSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <>
      <motion.div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-15%",
          width: "130%",
          height: 280,
          background:
            "radial-gradient(circle at center, #8ca6db 30%, transparent 70%)",
          opacity: 0.4,
          y: y2,
          pointerEvents: "none",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <motion.div style={{ y: y1 }}>
        <Typography
          variant="h3"
          color="#035a8e"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ mb: 3, position: "relative", zIndex: 1 }}
        >
          <Trans>Basic Communication in English</Trans>
        </Typography>
        <Typography
          variant="h6"
          color="#035a8e"
          fontWeight="medium"
          textAlign="center"
          mb={6}
          sx={{
            fontStyle: "italic",
            maxWidth: 700,
            mx: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Trans>
            Master essential phrases, greetings, and polite expressions to
            kickstart your English conversation skills.
          </Trans>
        </Typography>
      </motion.div>
    </>
  );
};

export default HeaderSection;
