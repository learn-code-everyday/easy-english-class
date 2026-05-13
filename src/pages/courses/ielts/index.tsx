"use client";

import { t } from "@lingui/macro";
import React from "react";

import MainLayout from "@/layouts/MainLayout";
import CourseLandingPage from "@/modules/CourseLandingPage";

export default function IeltsPage() {
  return (
    <CourseLandingPage
      course={{
        accent: "#7c3aed",
        eyebrow: t`IELTS Preparation`,
        title: t`Prepare for IELTS with a focused study system.`,
        description: t`Train listening, reading, writing, and speaking with exam strategies, guided practice, and feedback designed for measurable band improvement.`,
        targetLearners: [
          t`Students targeting university admission`,
          t`Professionals preparing for migration or work`,
          t`Learners who need structured band-score practice`,
        ],
        roadmap: [
          t`Diagnose strengths and weak skills`,
          t`Practice IELTS task types with timing habits`,
          t`Review writing and speaking with clear feedback`,
          t`Simulate test days with full practice sets`,
        ],
        outcomes: [
          t`Understand all IELTS test sections`,
          t`Use strategies for reading and listening accuracy`,
          t`Write clearer Task 1 and Task 2 responses`,
          t`Answer speaking prompts with better structure`,
        ],
        modules: [
          {
            title: t`Listening strategy`,
            description: t`Train prediction, note-taking, and section pacing.`,
            meta: t`Exam · 35 min`,
          },
          {
            title: t`Reading skills`,
            description: t`Practice skimming, scanning, and question matching.`,
            meta: t`Exam · 40 min`,
          },
          {
            title: t`Writing workshop`,
            description: t`Build essays with strong structure and accurate language.`,
            meta: t`Exam · 45 min`,
          },
          {
            title: t`Speaking mock test`,
            description: t`Practice fluency, coherence, vocabulary, and confidence.`,
            meta: t`Exam · 30 min`,
          },
        ],
        packages: [
          {
            name: t`Intensive`,
            price: t`$149`,
            description: t`Structured IELTS lessons with weekly practice tasks.`,
          },
          {
            name: t`Band Booster`,
            price: t`$249`,
            description: t`Full coaching plan with writing and speaking feedback.`,
          },
        ],
      }}
    />
  );
}

IeltsPage.getLayout = function getLayout(page: any) {
  return <MainLayout>{page}</MainLayout>;
};
