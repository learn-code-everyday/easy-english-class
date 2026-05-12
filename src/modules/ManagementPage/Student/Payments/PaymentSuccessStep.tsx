import { Trans } from "@lingui/macro";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DialogContent, Typography, Button, Stack } from "@mui/material";

type Props = {
  onClose: () => void;
};

export default function PaymentSuccessStep({ onClose }: Props) {
  return (
    <DialogContent sx={{ textAlign: "center", py: 4 }}>
      <CheckCircleIcon sx={{ color: "success.main", fontSize: 60, mb: 2 }} />
      <Typography variant="h5" fontWeight={700} mb={1}>
        <Trans>Payment Sent!</Trans>
      </Typography>
      <Typography color="text.secondary" mb={2}>
        <Trans>
          Thank you. We will verify your transaction and update your status
          soon.
        </Trans>
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" color="primary" onClick={onClose}>
          <Trans>Close</Trans>
        </Button>
      </Stack>
    </DialogContent>
  );
}
