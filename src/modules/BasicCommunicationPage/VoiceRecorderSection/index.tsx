"use client";

import { t, Trans } from "@lingui/macro";
import MicIcon from "@mui/icons-material/Mic";
import ReplayIcon from "@mui/icons-material/Replay";
import SendIcon from "@mui/icons-material/Send";
import StopIcon from "@mui/icons-material/Stop";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import React, { useState, useRef } from "react";

interface VoiceRecorderSectionProps {
  setErrorMsg?: React.Dispatch<React.SetStateAction<string>>;
}

const VoiceRecorderSection: React.FC<VoiceRecorderSectionProps> = ({
  setErrorMsg,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = () => {
    if (!navigator.mediaDevices) {
      setErrorMsg?.(t`Media Devices API not supported`);
      return;
    }
    audioChunks.current = [];
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.start();
        setIsRecording(true);
        mediaRecorder.current.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };
        mediaRecorder.current.onstop = () => {
          const blob = new Blob(audioChunks.current, { type: "audio/mp3" });
          const url = URL.createObjectURL(blob);
          setAudioURL(url);
          setIsRecording(false);
        };
      })
      .catch(() => setErrorMsg?.(t`Could not access microphone`));
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
  };

  const resetRecording = () => {
    setAudioURL(null);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5, md: 4 },
        borderRadius: 4,
        border: "1px solid rgba(148, 163, 184, 0.28)",
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
        backgroundColor: "rgba(255,255,255,0.96)",
      }}
    >
      <Typography
        variant="overline"
        sx={{ color: "#0f766e", fontWeight: 900, letterSpacing: 1.4 }}
      >
        <Trans>Step 3</Trans>
      </Typography>
      <Typography variant="h5" sx={{ mt: 0.5, color: "#0f172a", fontWeight: 900 }}>
        <Trans>Practice Speaking - Voice Recorder</Trans>
      </Typography>
      <Typography sx={{ mt: 1, mb: 3, color: "#64748b", lineHeight: 1.7 }}>
        <Trans>
          Click start and practice speaking the sample dialogue above. Record
          your voice and listen back to improve your pronunciation.
        </Trans>
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box
          sx={{
            borderRadius: 3,
            p: 2,
            backgroundColor: isRecording ? "#fef2f2" : "#f8fafc",
            border: `1px solid ${isRecording ? "#fecaca" : "#e2e8f0"}`,
          }}
        >
          <Typography sx={{ color: "#0f172a", fontWeight: 800 }}>
            {isRecording ? (
              <Trans>Recording in progress</Trans>
            ) : (
              <Trans>Ready to record</Trans>
            )}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.75, color: "#64748b" }}>
            <Trans>Speak clearly and keep a natural conversation pace.</Trans>
          </Typography>
        </Box>
        <Box
          sx={{
            borderRadius: 3,
            p: 2,
            backgroundColor: "#f0fdfa",
            border: "1px solid #ccfbf1",
          }}
        >
          <Typography sx={{ color: "#0f172a", fontWeight: 800 }}>
            <Trans>Pronunciation tip</Trans>
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.75, color: "#475569" }}>
            <Trans>Pause after each speaker line before recording your reply.</Trans>
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          flexWrap: "wrap",
        }}
      >
        {!isRecording && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<MicIcon />}
            onClick={startRecording}
            sx={{ borderRadius: 999, px: 3, textTransform: "none" }}
          >
            <Trans>Start Recording</Trans>
          </Button>
        )}
        {isRecording && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<StopIcon />}
            onClick={stopRecording}
            sx={{ borderRadius: 999, px: 3, textTransform: "none" }}
          >
            <Trans>Stop Recording</Trans>
          </Button>
        )}
        {audioURL && (
          <>
            <audio
              src={audioURL}
              controls
              style={{ flex: 1, minWidth: 250, maxWidth: "100%" }}
            />
            <IconButton
              color="primary"
              onClick={resetRecording}
              aria-label={t`Reset recording`}
              sx={{
                border: "1px solid #dbeafe",
                backgroundColor: "#eff6ff",
              }}
            >
              <ReplayIcon />
            </IconButton>
            <Button
              variant="contained"
              color="success"
              startIcon={<SendIcon />}
              onClick={() => alert(t`Voice sent! (simulate send)`)}
              sx={{ borderRadius: 999, px: 3, textTransform: "none" }}
            >
              <Trans>Send Recording</Trans>
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default VoiceRecorderSection;
