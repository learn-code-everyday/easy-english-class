import { Trans } from "@lingui/macro";
import { Card, Stack, Typography } from "@mui/material";

import { StudentPayment } from "./PaymentTable";

type Props = {
  data: StudentPayment[];
};

export default function PaymentSummary({ data }: Props) {
  const total = data.reduce((sum, p) => sum + p.amount, 0);
  const paid = data
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + p.amount, 0);
  const unpaid = data
    .filter((p) => p.status === "UNPAID" || p.status === "OVERDUE")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
      <Card sx={{ p: 2, flex: 1, minWidth: 200, bgcolor: "#f3fff7" }}>
        <Typography variant="subtitle2" color="text.secondary">
          <Trans>Total</Trans>
        </Typography>
        <Typography variant="h5" color="primary" fontWeight={600}>
          {total.toLocaleString()}₫
        </Typography>
      </Card>
      <Card sx={{ p: 2, flex: 1, minWidth: 200, bgcolor: "#e6f6ff" }}>
        <Typography variant="subtitle2" color="text.secondary">
          <Trans>Paid</Trans>
        </Typography>
        <Typography variant="h5" color="success.main" fontWeight={600}>
          {paid.toLocaleString()}₫
        </Typography>
      </Card>
      <Card sx={{ p: 2, flex: 1, minWidth: 200, bgcolor: "#fff7f0" }}>
        <Typography variant="subtitle2" color="text.secondary">
          <Trans>Unpaid / Overdue</Trans>
        </Typography>
        <Typography variant="h5" color="error.main" fontWeight={600}>
          {unpaid.toLocaleString()}₫
        </Typography>
      </Card>
    </Stack>
  );
}
