"use client";

import { t, Trans } from "@lingui/macro";
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { useInView } from "react-intersection-observer";

import MainLayout from "@/layouts/MainLayout";

const MissionSection = ({
  title,
  description,
  imageSrc,
  reverse = false,
}: {
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      ref={ref}
      container
      spacing={4}
      direction={reverse && !isMobile ? "row-reverse" : "row"}
      sx={{
        mb: 8,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(40px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          src={imageSrc}
          alt={title}
          sx={{
            width: "100%",
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            userSelect: "none",
          }}
          loading="lazy"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          variant="h4"
          color="#035a8e"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 2 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1.15rem", lineHeight: 1.8 }}
        >
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
};

const OurMissionPage = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflowX: "hidden",
        minHeight: "calc(100vh - 152px)",
        background: "linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 100%)",
      }}
    >
      {/* Parallax background layers */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage:
            "url('/background/parallax-layer1.png'), url('/background/parallax-layer2.png')",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "center top, center bottom",
          backgroundSize: "cover, cover",
          pointerEvents: "none",
          zIndex: -1,
          transformOrigin: "center center",
          willChange: "transform",
          animation: "parallaxScroll 60s linear infinite",
          "@keyframes parallaxScroll": {
            "0%": { backgroundPosition: "center top, center bottom" },
            "100%": { backgroundPosition: "center bottom, center top" },
          },
        }}
      />

      <Container maxWidth="md" sx={{ py: 10 }}>
        <Typography
          variant="h2"
          color="#035a8e"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ mb: 3 }}
        >
          <Trans>Our Mission</Trans>
        </Typography>

        <Typography
          variant="h5"
          color="#035a8e"
          fontWeight="medium"
          textAlign="center"
          sx={{ fontStyle: "italic", mb: 8, maxWidth: 800, mx: "auto" }}
        >
          <Trans>
            Empowering every learner to achieve their full potential through
            quality English education.
          </Trans>
        </Typography>

        {/* Mission Sections */}
        <MissionSection
          title={t`Accessible Learning for Everyone`}
          description={t`We are committed to making English education accessible to learners from all backgrounds and skill levels. Through flexible schedules, online and offline classes, and affordable pricing, we ensure no one is left behind.`}
          imageSrc="/images/accessible_learning.jpg"
        />

        <MissionSection
          title={t`Innovative Teaching Methods`}
          description={t`Our courses use the latest pedagogical research, incorporating interactive activities, technology, and real-world communication practice to create an engaging and effective learning environment.`}
          imageSrc="/images/innovative_methods.jpg"
          reverse
        />

        <MissionSection
          title={t`Personalized Learning Paths`}
          description={t`We understand that every learner is unique. Our experienced instructors design tailored lesson plans that meet individual goals, pace, and learning styles for optimal progress.`}
          imageSrc="/images/personalized_paths.jpg"
        />

        <MissionSection
          title={t`Community and Support`}
          description={t`Learning is more fun and effective in a supportive community. We foster a welcoming environment where students connect, practice, and grow together with mentorship and guidance at every step.`}
          imageSrc="/images/community_support.jpg"
          reverse
        />

        <MissionSection
          title={t`Global Opportunities`}
          description={t`Our mission extends beyond language skills. We aim to open doors to global academic, professional, and cultural opportunities by empowering learners with English proficiency.`}
          imageSrc="/images/global_opportunities.jpg"
        />

        {/* Video Introduction */}
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#035a8e"
            gutterBottom
          >
            <Trans>Watch Our Story</Trans>
          </Typography>
          <Box
            component="video"
            src="/videos/our_mission_intro.mp4"
            controls
            preload="metadata"
            sx={{
              width: "100%",
              maxWidth: 720,
              borderRadius: 3,
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              userSelect: "none",
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            <Trans>
              A glimpse into our passion and dedication to quality English
              education.
            </Trans>
          </Typography>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            backgroundColor: "#fc9a14",
            color: "white",
            py: 6,
            textAlign: "center",
            mt: 12,
            borderRadius: 2,
            boxShadow: "0 6px 20px rgba(252,154,20,0.5)",
            mx: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            <Trans>Ready to transform your English skills?</Trans>
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            <Trans>
              Join thousands of successful learners and start your journey
              today!
            </Trans>
          </Typography>
          <Link
            href="/register"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#fff",
              color: "#fc9a14",
              fontWeight: "bold",
              fontSize: "1.25rem",
              borderRadius: 30,
              cursor: "pointer",
              textDecoration: "none",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f9c351";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.color = "#fc9a14";
            }}
          >
            <Trans>Join now</Trans>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default OurMissionPage;

OurMissionPage.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
