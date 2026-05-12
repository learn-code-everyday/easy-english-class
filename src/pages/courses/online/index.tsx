"use client";

import { t, Trans } from "@lingui/macro";
import { Container, Typography } from "@mui/material";
import React, { useState } from "react";

import MainLayout from "@/layouts/MainLayout";
import CourseFilter from "@/modules/EnglishOnlinePage/CourseFilter";
import OnlineCourseCard from "@/modules/EnglishOnlinePage/OnlineCourseCard";

const allCourses = [
  {
    id: "english-beginner",
    title: t`English for Beginners`,
    description: t`Learn the basics of English grammar, vocabulary, and pronunciation.`,
    duration: t`3 months`,
    price: 120,
    image: "/courses/beginner.jpg",
    category: "General",
    detail: t`This course covers fundamental grammar, basic vocabulary and pronunciation to start your English journey confidently.`,
  },
  {
    id: "conversational-english",
    title: t`Conversational English`,
    description: t`Improve your speaking skills through practical conversation practice.`,
    duration: t`2 months`,
    price: 150,
    image: "/courses/conversation.jpg",
    category: "General",
    detail: t`Practical lessons focused on everyday conversations, idioms, and expressions for fluency.`,
  },
  {
    id: "business-english",
    title: t`Business English`,
    description: t`Master English skills tailored for professional and business contexts.`,
    duration: t`4 months`,
    price: 200,
    image: "/courses/business.jpg",
    category: "Professional",
    detail: t`Learn business vocabulary, email writing, presentations, negotiations, and more.`,
  },
  {
    id: "ielts-preparation",
    title: t`IELTS Preparation`,
    description: t`Prepare effectively for the IELTS exam with experienced instructors.`,
    duration: t`5 months`,
    price: 300,
    image: "/courses/ielts.jpg",
    category: "Exam",
    detail: t`Focused training on IELTS Listening, Reading, Writing and Speaking with test strategies.`,
  },
];

const categories = [
  { label: t`All`, value: "All" },
  { label: t`General`, value: "General" },
  { label: t`Professional`, value: "Professional" },
  { label: t`Exam`, value: "Exam" },
];

export default function OnlineCoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses =
    selectedCategory === "All"
      ? allCourses
      : allCourses.filter((course) => course.category === selectedCategory);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        color="#035a8e"
        textAlign="center"
        gutterBottom
      >
        <Trans>Our Online Courses</Trans>
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        mb={6}
      >
        <Trans>
          Select the course that fits your learning goals. Click &quot;View
          Details&quot; for more info.
        </Trans>
      </Typography>

      <CourseFilter
        selected={selectedCategory}
        options={categories}
        onChange={setSelectedCategory}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {filteredCourses.map((course) => (
          <OnlineCourseCard key={course.id} course={course} />
        ))}
      </div>
    </Container>
  );
}

OnlineCoursesPage.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
