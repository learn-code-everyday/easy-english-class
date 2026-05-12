"use client";

import { t, Trans } from "@lingui/macro";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Paper,
  Button,
  Stack,
  Fade,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

const LiveChatSupport = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: t`Hi! How can we assist you today?` },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending message
  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: input.trim() }]);
    setInput("");

    // Simulate bot response with delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: t`Thank you for your message. Our support team will get back to you shortly.`,
        },
      ]);
    }, 1500);
  };

  return (
    <>
      {/* Floating button */}
      <IconButton
        onClick={() => setOpen((v) => !v)}
        color="primary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          bgcolor: "primary.main",
          color: "white",
          "&:hover": { bgcolor: "primary.dark" },
          zIndex: 1500,
          boxShadow: 3,
        }}
        aria-label={open ? t`Close live chat` : t`Open live chat`}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </IconButton>

      {/* Chat box */}
      <Fade in={open}>
        <Paper
          elevation={8}
          sx={{
            position: "fixed",
            bottom: 80,
            right: 24,
            width: { xs: 320, sm: 400 },
            maxHeight: 450,
            display: open ? "flex" : "none",
            flexDirection: "column",
            borderRadius: 2,
            boxShadow: 5,
            backgroundColor: "background.paper",
            zIndex: 1400,
          }}
          role="region"
          aria-live="polite"
          aria-label={t`Live chat support`}
        >
          <Box
            sx={{
              px: 2,
              py: 1,
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              <Trans>Live Support</Trans>
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
              bgcolor: "grey.100",
            }}
          >
            {messages.map(({ from, text }, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: from === "user" ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: "70%",
                    bgcolor: from === "user" ? "primary.main" : "grey.300",
                    color:
                      from === "user" ? "primary.contrastText" : "text.primary",
                  }}
                >
                  {text}
                </Paper>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          <Stack
            direction="row"
            spacing={1}
            sx={{ p: 1, borderTop: "1px solid", borderColor: "divider" }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder={t`Type your message...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              fullWidth
              aria-label={t`Type your message`}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              aria-label={t`Send message`}
              disabled={!input.trim()}
            >
              <Trans>Send</Trans>
            </Button>
          </Stack>
        </Paper>
      </Fade>
    </>
  );
};

export default LiveChatSupport;
