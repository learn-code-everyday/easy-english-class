import { t, Trans } from "@lingui/macro";
import PaymentIcon from "@mui/icons-material/Payment";
import { Chip, Stack, Link } from "@mui/material";
import { useState } from "react";

import CommonTable, { Column } from "@/components-shared/CommonTable";

import PayNowModal from "./PaynowModal";

export type StudentPayment = {
  id: string;
  invoiceNo: string;
  date: string;
  className: string;
  amount: number;
  status: "PAID" | "UNPAID" | "REFUNDED" | "OVERDUE";
  method: "BANK" | "MOMO" | "CASH" | "CREDIT";
  note?: string;
};

const paymentColumns: Column<StudentPayment>[] = [
  {
    field: "invoiceNo",
    label: t`Invoice`,
    render: (row: StudentPayment) => (
      <Stack direction="row" alignItems="center" gap={1}>
        <PaymentIcon fontSize="small" /> {row.invoiceNo}
      </Stack>
    ),
  },
  { field: "date", label: t`Date` },
  { field: "className", label: t`Class` },
  {
    field: "amount",
    label: t`Amount`,
    align: "right",
    render: (row: StudentPayment) => (
      <span style={{ fontWeight: 600, color: "#055" }}>
        {row.amount.toLocaleString()}₫
      </span>
    ),
  },
  {
    field: "status",
    label: t`Status`,
    render: (row: StudentPayment) => (
      <Chip
        size="small"
        label={row.status}
        color={
          row.status === "PAID"
            ? "success"
            : row.status === "UNPAID" || row.status === "OVERDUE"
              ? "error"
              : row.status === "REFUNDED"
                ? "default"
                : "default"
        }
        sx={{
          textTransform: "capitalize",
          fontWeight: 500,
          ...(row.status === "OVERDUE" && {
            bgcolor: "#ff8585",
            color: "#fff",
          }),
        }}
      />
    ),
  },
  {
    field: "method",
    label: t`Method`,
    render: (row: StudentPayment) => (
      <Chip
        size="small"
        label={row.method}
        color="primary"
        variant="outlined"
        sx={{ textTransform: "capitalize" }}
      />
    ),
  },
  { field: "note", label: t`Note` },
  {
    render: (row: StudentPayment) =>
      row.status !== "PAID" ? (
        <PayNowActionButton payment={row} />
      ) : (
        <Link href="#" underline="hover" fontWeight={500}>
          <Trans>View</Trans>
        </Link>
      ),
  },
];

function PayNowActionButton({ payment }: { payment: StudentPayment }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Link
        component="button"
        underline="hover"
        color="primary"
        fontWeight={500}
        onClick={() => setOpen(true)}
      >
        <Trans>Pay now</Trans>
      </Link>

      <PayNowModal
        open={open}
        onClose={() => setOpen(false)}
        payment={payment}
      />
    </>
  );
}

type Props = {
  data: StudentPayment[];
  loading?: boolean;
  pagination?: { page: number; limit: number; total: number };
  onPageChange?: (page: number, limit: number) => void;
};

export default function StudentPaymentTable({
  data,
  loading,
  pagination,
  onPageChange,
}: Props) {
  return (
    <CommonTable
      columns={paymentColumns}
      data={data}
      loading={loading}
      pagination={pagination}
      onPageChange={onPageChange}
      emptyText={t`No payments found.`}
    />
  );
}
