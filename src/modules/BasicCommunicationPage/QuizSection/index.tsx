"use client";

import { t, Trans } from "@lingui/macro";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

const quizQuestions = [
  {
    id: 1,
    type: "multiple-choice",
    question: t`How do you greet someone in the morning?`,
    options: [t`Good evening`, t`Good morning`, t`Good night`, t`Hello night`],
    answer: "Good morning",
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
    words: [t`fine`, t`am`, t`I`],
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
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const [shuffledWords, setShuffledWords] = useState<string[]>([]);

  useEffect(() => {
    const orderQ = quizQuestions.find((q) => q.type === "order-sentence");
    if (orderQ && orderQ.words) {
      setShuffledWords(shuffle(orderQ.words));
    }
  }, []);

  const handleChangeMC = (qid: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
  };

  const handleChangeFillBlank = (qid: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: val.trim() }));
  };

  const handleWordClick = (word: string) => {
    if (!answers[currentQuestion]) {
      setAnswers((prev) => ({ ...prev, [currentQuestion]: [word] }));
    } else {
      const newOrder = [...answers[currentQuestion]];
      if (newOrder.includes(word)) {
        setAnswers((prev) => ({
          ...prev,
          [currentQuestion]: newOrder.filter((w) => w !== word),
        }));
      } else {
        setAnswers((prev) => ({
          ...prev,
          [currentQuestion]: [...newOrder, word],
        }));
      }
    }
  };

  const validateAnswer = () => {
    const question = quizQuestions[currentQuestion];
    const userAnswer = answers[question.id ?? currentQuestion];
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
    quizQuestions.forEach((q, i) => {
      const ans = answers[q.id ?? i];
      if (q.type === "multiple-choice") {
        if (ans === q.answer) sc++;
      } else if (q.type === "fill-blank") {
        if (ans && q.answer.includes(ans.toLowerCase())) sc++;
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

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        backgroundColor: "white",
        borderRadius: 3,
        maxWidth: 900,
        mx: "auto",
        boxShadow: "0 10px 25px rgba(3,90,142,0.12)",
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={4} color="#035a8e">
        <Trans>Interactive Quiz</Trans>
      </Typography>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          {(() => {
            const q = quizQuestions[currentQuestion];
            switch (q.type) {
              case "multiple-choice":
                return (
                  <>
                    <Typography fontWeight="medium" mb={2}>
                      {currentQuestion + 1}. {q.question}
                    </Typography>
                    <RadioGroup
                      value={answers[q.id] || ""}
                      onChange={(e) => handleChangeMC(q.id, e.target.value)}
                    >
                      {q.options?.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio color="primary" />}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </>
                );
              case "fill-blank":
                return (
                  <>
                    <Typography fontWeight="medium" mb={2}>
                      {currentQuestion + 1}. {q.question}
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder={t`Type your answer here...`}
                      value={answers[q.id] || ""}
                      onChange={(e) =>
                        handleChangeFillBlank(q.id, e.target.value)
                      }
                      sx={{ mb: 3 }}
                    />
                  </>
                );
              case "order-sentence":
                return (
                  <>
                    <Typography fontWeight="medium" mb={2}>
                      {currentQuestion + 1}. {q.question}
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
                        const selected = answers[q.id]?.includes(word);
                        return (
                          <Button
                            key={word}
                            variant={selected ? "contained" : "outlined"}
                            color="primary"
                            size="small"
                            onClick={() => handleWordClick(word)}
                            sx={{ cursor: "pointer" }}
                          >
                            {word}
                          </Button>
                        );
                      })}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      <Trans>
                        Click words to build the correct sentence in order.
                      </Trans>
                    </Typography>
                  </>
                );
              default:
                return null;
            }
          })()}
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
        >
          <Trans>Previous</Trans>
        </Button>
        {currentQuestion < quizQuestions.length - 1 && (
          <Button variant="contained" color="primary" onClick={handleNext}>
            <Trans>Next</Trans>
          </Button>
        )}
        {currentQuestion === quizQuestions.length - 1 && (
          <Button variant="contained" color="success" onClick={handleNext}>
            <Trans>Submit</Trans>
          </Button>
        )}
      </Box>

      {showResult && (
        <Box textAlign="center" mt={3}>
          <Typography
            variant="h6"
            fontWeight="bold"
            color={score >= quizQuestions.length / 2 ? "green" : "error"}
          >
            <Trans>Your Score:</Trans> {score} / {quizQuestions.length}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default QuizSection;
