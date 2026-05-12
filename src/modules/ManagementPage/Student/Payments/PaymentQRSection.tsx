import { t, Trans } from "@lingui/macro";
import { Box, Stack, Typography } from "@mui/material";

import CopyValue from "@/components/CopyValue";
import MomoQR from "@/components/MomoQR";
import VietQR from "@/components/VietQR";

type Props = {
  method: "BANK" | "MOMO" | string;
  amount: number;
  invoiceNo: string;
};

const BANK_INFO = {
  bankId: "VCB",
  accountNo: "0123456789",
  accountName: "NGUYEN VAN A",
};

const MOMO_INFO = {
  phone: "0905123456",
};

export default function PaymentQRSection({ method, amount, invoiceNo }: Props) {
  if (method === "BANK")
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <VietQR
          bankId={BANK_INFO.bankId}
          accountNo={BANK_INFO.accountNo}
          accountName={BANK_INFO.accountName}
          amount={amount}
          addInfo={t`Pay tuition ${invoiceNo}`}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          mt={1}
          textAlign="center"
        >
          <Trans>Scan VietQR code with your banking app.</Trans>
        </Typography>
        <Stack spacing={1} width="100%" alignItems="center" mt={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography fontWeight={500}>
              <Trans>Account No:</Trans>
            </Typography>
            <Typography>{BANK_INFO.accountNo}</Typography>
            <CopyValue value={BANK_INFO.accountNo} label={t`Account No`} />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography fontWeight={500}>
              <Trans>Account Name:</Trans>
            </Typography>
            <Typography>{BANK_INFO.accountName}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography fontWeight={500}>
              <Trans>Transfer Info:</Trans>
            </Typography>
            <Typography>{t`Pay tuition ${invoiceNo}`}</Typography>
            <CopyValue
              value={t`Pay tuition ${invoiceNo}`}
              label={t`Transfer Info`}
            />
          </Stack>
        </Stack>
      </Box>
    );
  if (method === "MOMO")
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <MomoQR
          phone={MOMO_INFO.phone}
          amount={amount}
          comment={t`Pay tuition ${invoiceNo}`}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          mt={1}
          textAlign="center"
        >
          <Trans>Scan Momo QR to pay.</Trans>
        </Typography>
        <Stack spacing={1} width="100%" alignItems="center" mt={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography fontWeight={500}>
              <Trans>Phone:</Trans>
            </Typography>
            <Typography>{MOMO_INFO.phone}</Typography>
            <CopyValue value={MOMO_INFO.phone} label={t`Phone`} />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography fontWeight={500}>
              <Trans>Comment:</Trans>
            </Typography>
            <Typography>{t`Pay tuition ${invoiceNo}`}</Typography>
            <CopyValue value={t`Pay tuition ${invoiceNo}`} label={t`Comment`} />
          </Stack>
        </Stack>
      </Box>
    );
  return (
    <Typography color="text.secondary" align="center">
      <Trans>No QR available for this payment method.</Trans>
    </Typography>
  );
}
