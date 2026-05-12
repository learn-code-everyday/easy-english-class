import { t, Trans } from "@lingui/macro";
import { Chip, Link } from "@mui/material";
import React from "react";

import CommonTable, { Column } from "@/components-shared/CommonTable";

export type StudentMaterial = {
  id: string;
  name: string;
  description: string;
  className: string;
  type: "PDF" | "Video" | "Link" | "Doc";
  url: string;
  status: "AVAILABLE" | "UPCOMING" | "EXPIRED";
};
type Props = {
  data: StudentMaterial[];
};

const columns: Column<StudentMaterial>[] = [
  { field: "name", label: t`Material Name` },
  { field: "className", label: t`Class` },
  {
    field: "type",
    label: t`Type`,
    align: "center",
    render: (row) => (
      <Chip
        label={row.type}
        color={
          row.type === "PDF"
            ? "primary"
            : row.type === "Video"
              ? "secondary"
              : "default"
        }
        size="small"
        variant="outlined"
      />
    ),
  },
  { field: "description", label: t`Description` },
  {
    field: "status",
    label: t`Status`,
    align: "center",
    render: (row) => (
      <Chip
        label={row.status}
        color={
          row.status === "AVAILABLE"
            ? "success"
            : row.status === "UPCOMING"
              ? "warning"
              : "default"
        }
        size="small"
      />
    ),
  },
  {
    field: "url",
    label: t`Download/View`,
    align: "center",
    render: (row) =>
      row.status === "AVAILABLE" ? (
        <Link
          href={row.url}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          <Trans>View</Trans>
        </Link>
      ) : (
        <span style={{ color: "#aaa" }}>
          <Trans>N/A</Trans>
        </span>
      ),
  },
];

const StudentMaterialTable: React.FC<Props> = ({ data }) => (
  <CommonTable<StudentMaterial>
    columns={columns}
    data={data}
    emptyText={t`No materials found`}
  />
);

export default StudentMaterialTable;
