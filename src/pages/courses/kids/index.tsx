"use client";

import { t } from "@lingui/macro";
import React from "react";

import MainLayout from "@/layouts/MainLayout";
import CourseLandingPage from "@/modules/CourseLandingPage";

export default function KidEnglishPage() {
  return (
    <CourseLandingPage
      course={{
        accent: "#f59e0b",
        eyebrow: t`Kids English`,
        title: t`A playful English path for young learners.`,
        description: t`Help children learn vocabulary, phonics, listening, and speaking through friendly lessons, games, stories, and creative practice.`,
        targetLearners: [
          t`Children starting English for the first time`,
          t`Young learners who need more speaking confidence`,
          t`Parents looking for a guided after-school program`,
        ],
        roadmap: [
          t`Build vocabulary with pictures and stories`,
          t`Practice phonics and simple sentence patterns`,
          t`Join guided speaking games and role plays`,
          t`Review progress with parent-friendly milestones`,
        ],
        outcomes: [
          t`Recognize common words and classroom phrases`,
          t`Speak in short, confident sentences`,
          t`Improve listening through stories and songs`,
          t`Stay motivated with playful learning routines`,
        ],
        modules: [
          {
            title: t`Phonics friends`,
            description: t`Learn sounds, letters, and simple pronunciation habits.`,
            meta: t`Kids · 20 min`,
          },
          {
            title: t`Story time`,
            description: t`Listen, repeat, and answer simple story questions.`,
            meta: t`Kids · 25 min`,
          },
          {
            title: t`Vocabulary games`,
            description: t`Practice animals, colors, family, food, and school words.`,
            meta: t`Kids · 18 min`,
          },
          {
            title: t`Speak and play`,
            description: t`Use short role plays to make English feel natural.`,
            meta: t`Kids · 22 min`,
          },
        ],
        packages: [
          {
            name: t`Play Starter`,
            price: t`$59`,
            description: t`Fun weekly lessons with guided home practice.`,
          },
          {
            name: t`Family Plan`,
            price: t`$119`,
            description: t`Teacher support, parent updates, and progress review.`,
          },
        ],
      }}
    />
  );
}

KidEnglishPage.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
