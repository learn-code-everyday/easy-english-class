import { Trans } from "@lingui/macro";
import { TableBody, TableRow, TableCell, Skeleton, Box } from "@mui/material";
import React from "react";

import { Column, getNestedValue } from ".";

type TableBodyContentProps<T> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
  skeletonRows?: number;
  useServerPaging?: boolean;
  page?: number;
  rowsPerPage?: number;
};

export default function TableBodyContent<T>({
  columns,
  data,
  loading = false,
  emptyText,
  skeletonRows = 5,
}: TableBodyContentProps<T>) {
  if (loading) {
    return (
      <TableBody>
        {[...Array(skeletonRows)].map((_, idx) => (
          <TableRow key={idx}>
            {columns.map((col, colIdx) => (
              <TableCell key={colIdx}>
                <Skeleton
                  variant="rounded"
                  height={34}
                  sx={{ borderRadius: 2 }}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }

  if (!data.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns.length} align="center" sx={{ py: 8 }}>
            <Box className="mx-auto flex max-w-sm flex-col items-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center">
              <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                —
              </div>
              <div className="text-sm font-semibold text-slate-700">
                {emptyText || <Trans>No data</Trans>}
              </div>
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {data.map((row, idx) => (
        <TableRow hover tabIndex={-1} key={idx}>
          {columns.map((col, colIdx) => (
            <TableCell
              key={colIdx}
              align={col.align || "left"}
              sx={{
                minWidth: col.minWidth ? col.minWidth : undefined,
                maxWidth: col.minWidth ? col.minWidth : undefined,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {col.render
                ? col.render(row, idx)
                : String(getNestedValue(row, col.field as string) ?? "")}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
