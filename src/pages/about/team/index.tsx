"use client";

import { t, Trans } from "@lingui/macro";
import { Box, Container, Typography, Avatar, Grid, Paper } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useInView } from "react-intersection-observer";

import MainLayout from "@/layouts/MainLayout";

const teamMembers = [
  {
    name: "Alice Nguyen",
    position: t`Founder & CEO`,
    avatar: "/team/alice.jpg",
    description: t`Visionary leader passionate about education and technology, guiding our mission with commitment and heart.`,
  },
  {
    name: "Brian Tran",
    position: t`Head of Curriculum`,
    avatar: "/team/brian.jpg",
    description: t`Experienced educator designing innovative, practical, and engaging English learning programs.`,
  },
  {
    name: "Cindy Le",
    position: t`Marketing Manager`,
    avatar: "/team/cindy.jpg",
    description: t`Creative strategist bringing our message to students worldwide and growing our community.`,
  },
  {
    name: "David Ho",
    position: t`Lead Instructor`,
    avatar: "/team/david.jpg",
    description: t`Dedicated teacher focused on helping students gain confidence and fluency through real-world practice.`,
  },
  {
    name: "Eva Pham",
    position: t`Product Manager`,
    avatar: "/team/eva.jpg",
    description: t`Driving product innovation and user experience for seamless and effective learning journeys.`,
  },
  {
    name: "Frank Nguyen",
    position: t`Technical Lead`,
    avatar: "/team/frank.jpg",
    description: t`Ensuring a robust, secure, and scalable platform supporting millions of learners worldwide.`,
  },
];

interface TeamMemberCardProps {
  name: string;
  position: string;
  avatar: string;
  description: string;
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  position,
  avatar,
  description,
  index,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} ref={ref}>
      <Paper
        elevation={6}
        sx={{
          p: 5,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
          backgroundColor: "#fff",
          boxShadow: "0 8px 20px rgba(3, 90, 142, 0.15)",
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(40px)",
          transition: `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`,
          textAlign: "center",
          cursor: "default",
          userSelect: "none",
          "&:hover": {
            transform: "scale(1.07)",
            boxShadow: "0 16px 40px rgba(3, 90, 142, 0.3)",
          },
        }}
      >
        <Avatar
          src={avatar}
          alt={name}
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            border: "3px solid #fc9a14",
            boxShadow: "0 0 10px rgba(252, 154, 20, 0.6)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: "0 0 20px rgba(252, 154, 20, 0.9)",
            },
            userSelect: "none",
          }}
        />
        <Typography
          variant="h6"
          color="#035a8e"
          fontWeight="bold"
          gutterBottom
          sx={{ userSelect: "text" }}
        >
          {name}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          gutterBottom
          sx={{ fontStyle: "italic" }}
        >
          {position}
        </Typography>
        <Typography
          variant="body2"
          color="#444"
          sx={{
            fontSize: 16,
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>
      </Paper>
    </Grid>
  );
};

const OurTeamPage = () => {
  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: "#f0f4ff",
        minHeight: "calc(100vh - 152px)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url(/images/parallax-bg.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          transform: "translateY(-20%)",
          opacity: 0.1,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h3"
          color="#035a8e"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ mb: 4 }}
        >
          <Trans>Meet Our Team</Trans>
        </Typography>
        <Typography
          variant="h5"
          color="#035a8e"
          fontWeight="medium"
          textAlign="center"
          mb={6}
          sx={{ fontStyle: "italic", maxWidth: 800, mx: "auto" }}
        >
          <Trans>
            A passionate group of educators, innovators, and leaders dedicated
            to empowering learners worldwide.
          </Trans>
        </Typography>

        <Grid container spacing={4}>
          {teamMembers.map(({ name, position, avatar, description }, index) => (
            <TeamMemberCard
              key={name}
              name={name}
              position={position}
              avatar={avatar}
              description={description}
              index={index}
            />
          ))}
        </Grid>

        {/* Call to Action */}
        <Box
          sx={{
            backgroundColor: "#fc9a14",
            color: "white",
            py: 6,
            textAlign: "center",
            mt: 10,
            borderRadius: 2,
            boxShadow: "0 6px 20px rgba(252,154,20,0.5)",
            mx: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            <Trans>Join Our Community</Trans>
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            <Trans>
              Become a part of our mission to make English education accessible
              to everyone.
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
            <Trans>Get Started</Trans>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default OurTeamPage;

OurTeamPage.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
