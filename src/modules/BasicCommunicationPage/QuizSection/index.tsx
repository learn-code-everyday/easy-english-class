"use client";

import { t, Trans } from "@lingui/macro";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

type QuizOption = {
  label: string;
  value: string;
};

type QuizQuestion =
  | {
      answer: string;
      id: number;
      options: QuizOption[];
      question: string;
      type: "multiple-choice";
    }
  | {
      answer: string[];
      id: number;
      question: string;
      type: "fill-blank";
    }
  | {
      answer: string[];
      id: number;
      question: string;
      type: "order-sentence";
      words: QuizOption[];
    };

const getQuizQuestions = (): QuizQuestion[] => [
  {
    id: 1,
    type: "multiple-choice",
    question: t`How do you greet someone in the morning?`,
    options: [
      { label: t`Good evening`, value: "good-evening" },
      { label: t`Good morning`, value: "good-morning" },
      { label: t`Good night`, value: "good-night" },
      { label: t`Hello night`, value: "hello-night" },
    ],
    answer: "good-morning",
  },
  {
    id: 2,
    type: "fill-blank",
    question: t`Complete the sentence: 'I ____ fine, thank you.'`,
    answer: ["am", "am."],
  },
  {
    id: 3,
    type: "order-sentence",
    question: t`Arrange the words to form a correct sentence: 'fine / am / I'`,
    words: [
      { label: t`fine`, value: "fine" },
      { label: t`am`, value: "am" },
      { label: t`I`, value: "I" },
    ],
    answer: ["I", "am", "fine"],
  },
];

// shuffle helper
const shuffle = <T,>(array: T[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

interface Props {
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}

const QuizSection: React.FC<Props> = ({ setErrorMsg }) => {
  const quizQuestions = getQuizQuestions();
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const [shuffledWordValues] = useState(() => shuffle(["fine", "am", "I"]));
  const current = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleChangeMC = (qid: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
  };

  const handleChangeFillBlank = (qid: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: val.trim() }));
  };

  const handleWordClick = (qid: number, word: string) => {
    const currentAnswer = answers[qid];
    const currentWords = Array.isArray(currentAnswer) ? currentAnswer : [];

    if (currentWords.includes(word)) {
      setAnswers((prev) => ({
        ...prev,
        [qid]: currentWords.filter((w) => w !== word),
      }));
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      [qid]: [...currentWords, word],
    }));
  };

  const validateAnswer = () => {
    const userAnswer = answers[current.id];
    if (!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
      setErrorMsg(t`Please answer the question before proceeding.`);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateAnswer()) return;
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowResult(false);
      setErrorMsg("");
    }
  };

  const calculateScore = () => {
    let sc = 0;
    quizQuestions.forEach((q) => {
      const ans = answers[q.id];
      if (q.type === "multiple-choice") {
        if (ans === q.answer) sc++;
      } else if (q.type === "fill-blank") {
        if (typeof ans === "string" && q.answer.includes(ans.toLowerCase())) {
          sc++;
        }
      } else if (q.type === "order-sentence") {
        if (
          Array.isArray(ans) &&
          ans.length === q.answer.length &&
          ans.every((w, i) => w === q.answer[i])
        ) {
          sc++;
        }
      }
    });
    setScore(sc);
  };

  const selectedWords =
    current.type === "order-sentence" && Array.isArray(answers[current.id])
      ? (answers[current.id] as string[])
      : [];
  const currentTextAnswer =
    typeof answers[current.id] === "string" ? answers[current.id] : "";
  const shuffledWords =
    current.type === "order-sentence"
      ? shuffledWordValues
          .map((value) => current.words.find((word) => word.value === value))
          .filter((word): word is QuizOption => Boolean(word))
      : [];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5, md: 4 },
        backgroundColor: "rgba(255,255,255,0.96)",
        borderRadius: 4,
        border: "1px solid rgba(148, 163, 184, 0.28)",
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{ color: "#2563eb", fontWeight: 900, letterSpacing: 1.4 }}
          >
            <Trans>Step 2</Trans>
          </Typography>
          <Typography
            variant="h5"
            sx={{ mt: 0.5, color: "#0f172a", fontWeight: 900 }}
          >
            <Trans>Interactive Quiz</Trans>
          </Typography>
        </Box>
        <Typography
          sx={{
            alignSelf: "center",
            borderRadius: 999,
            px: 1.5,
            py: 0.75,
            backgroundColor: "#eff6ff",
            color: "#2563eb",
            fontSize: 13,
            fontWeight: 800,
          }}
        >
          <Trans>Question</Trans> {currentQuestion + 1} / {quizQuestions.length}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          mb: 3,
          height: 8,
          borderRadius: 999,
          backgroundColor: "#e2e8f0",
          "& .MuiLinearProgress-bar": {
            borderRadius: 999,
            background: "linear-gradient(90deg, #2563eb, #14b8a6)",
          },
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25 }}
        >
          {current.type === "multiple-choice" && (
            <FormControl component="fieldset" fullWidth>
              <FormLabel
                component="legend"
                sx={{
                  mb: 2,
                  color: "#0f172a",
                  fontSize: 18,
                  fontWeight: 800,
                  "&.Mui-focused": { color: "#0f172a" },
                }}
              >
                {current.question}
              </FormLabel>
              <RadioGroup
                value={currentTextAnswer}
                onChange={(e) => handleChangeMC(current.id, e.target.value)}
                sx={{ gap: 1.25 }}
              >
                {current.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio color="primary" />}
                    label={option.label}
                    sx={{
                      m: 0,
                      px: 2,
                      py: 1,
                      border: "1px solid #e2e8f0",
                      borderRadius: 3,
                      backgroundColor:
                        answers[current.id] === option.value
                          ? "#eff6ff"
                          : "#ffffff",
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}

          {current.type === "fill-blank" && (
            <Box>
              <Typography
                id={`question-${current.id}`}
                sx={{ mb: 2, color: "#0f172a", fontSize: 18, fontWeight: 800 }}
              >
                {current.question}
              </Typography>
              <TextField
                fullWidth
                label={t`Your answer`}
                variant="outlined"
                placeholder={t`Type your answer here...`}
                value={currentTextAnswer}
                onChange={(e) =>
                  handleChangeFillBlank(current.id, e.target.value)
                }
                inputProps={{ "aria-labelledby": `question-${current.id}` }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "#ffffff",
                  },
                }}
              />
            </Box>
          )}

          {current.type === "order-sentence" && (
            <Box>
              <Typography
                sx={{ mb: 2, color: "#0f172a", fontSize: 18, fontWeight: 800 }}
              >
                {current.question}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  mb: 2,
                }}
              >
                {shuffledWords.map((word) => {
                  const selected = selectedWords.includes(word.value);
                  return (
                    <Button
                      key={word.value}
                      variant={selected ? "contained" : "outlined"}
                      color="primary"
                      onClick={() => handleWordClick(current.id, word.value)}
                      sx={{ borderRadius: 999, textTransform: "none" }}
                    >
                      {word.label}
                    </Button>
                  );
                })}
              </Box>
              <Box
                sx={{
                  minHeight: 48,
                  borderRadius: 3,
                  border: "1px dashed #cbd5e1",
                  backgroundColor: "#f8fafc",
                  px: 2,
                  py: 1.5,
                  color: selectedWords.length ? "#0f172a" : "#64748b",
                  fontWeight: 700,
                }}
              >
                {selectedWords.length ? (
                  selectedWords.join(" ")
                ) : (
                  <Trans>Your sentence will appear here</Trans>
                )}
              </Box>
              <Typography variant="body2" sx={{ mt: 1.5, color: "#64748b" }}>
                <Trans>
                  Click words to build the correct sentence in order.
                </Trans>
              </Typography>
            </Box>
          )}
        </motion.div>
      </AnimatePresence>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          disabled={currentQuestion === 0}
          onClick={handlePrev}
          sx={{ borderRadius: 999, px: 3, textTransform: "none" }}
        >
          <Trans>Previous</Trans>
        </Button>
        {currentQuestion < quizQuestions.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ borderRadius: 999, px: 3, textTransform: "none" }}
          >
            <Trans>Next</Trans>
          </Button>
        )}
        {currentQuestion === quizQuestions.length - 1 && (
          <Button
            variant="contained"
            color="success"
            onClick={handleNext}
            sx={{ borderRadius: 999, px: 3, textTransform: "none" }}
          >
            <Trans>Submit</Trans>
          </Button>
        )}
      </Box>

      {showResult && (
        <Box
          textAlign="center"
          mt={3}
          sx={{
            borderRadius: 3,
            p: 2,
            backgroundColor:
              score >= quizQuestions.length / 2 ? "#ecfdf5" : "#fef2f2",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color={score >= quizQuestions.length / 2 ? "#047857" : "error"}
          >
            <Trans>Your Score:</Trans> {score} / {quizQuestions.length}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default QuizSection;
