import { t } from "@lingui/macro";
import {
  Table,
  TableContainer,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  TablePagination,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import TableBodyContent from "./TableBodyContent";
import TableHeader from "./TableHeader";

// ===== TYPE DEFINITIONS =====

export type Column<T = any> = {
  field?: keyof T | string;
  label?: string;
  align?: "left" | "right" | "center";
  minWidth?: number | string;
  render?: (row: T, idx: number) => React.ReactNode;
};

type FilterOption = { label: string; value: string };
export type FilterConfig<T = any> = {
  label: string;
  field?: keyof T | string;
  value: string;
  options?: FilterOption[];
  type?: "select" | "search";
  onChange: (val: string) => void;
  placeholder?: string;
};

type PaginationConfig = {
  page: number;
  limit: number;
  total: number;
};

type CommonTableProps<T extends object> = {
  columns: Column<T>[];
  data: T[];
  filters?: FilterConfig<T>[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  dense?: boolean;
  emptyText?: string;
  pagination?: PaginationConfig;
  onPageChange?: (page: number, limit: number) => void;
  loading?: boolean;
};

export function getNestedValue(obj: any, path?: string) {
  if (!path) return obj;
  return path.split(".").reduce((acc, key) => {
    if (acc == null) return undefined;
    // hỗ trợ cả mảng như students.0.name nếu cần
    if (key.match(/^\d+$/)) return acc[parseInt(key, 10)];
    return acc[key];
  }, obj);
}

export default function CommonTable<T extends object>({
  loading = false,
  columns,
  data,
  filters = [],
  pagination,
  onPageChange,
  rowsPerPageOptions = [5, 10, 25, 50, 100],
  defaultRowsPerPage = 10,
  dense = false,
  emptyText = t`No data`,
}: CommonTableProps<T>) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const useServerPaging = !!pagination && !!onPageChange;

  useEffect(() => {
    if (useServerPaging) {
      setPage(pagination!.page - 1);
      setRowsPerPage(pagination!.limit);
    }
    // eslint-disable-next-line
  }, [pagination?.page, pagination?.limit]);

  const handleChangePage = (_: unknown, newPage: number) => {
    if (useServerPaging && onPageChange) {
      onPageChange(newPage + 1, rowsPerPage);
    } else {
      setPage(newPage);
    }
  };
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = parseInt(e.target.value, 10);
    if (useServerPaging && onPageChange) {
      onPageChange(1, limit);
    } else {
      setRowsPerPage(limit);
      setPage(0);
    }
  };

  const filteredData = useMemo(() => {
    let filtered = data;
    filters.forEach((f) => {
      if (f.type !== "search" && f.value && f.value !== "ALL") {
        filtered = filtered.filter(
          (item) => String(item[f.field as keyof T]) === f.value
        );
      }
    });
    return filtered;
  }, [data, filters]);

  const paginatedData = useServerPaging
    ? filteredData
    : filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const skeletonRows = useServerPaging
    ? (pagination?.limit ?? defaultRowsPerPage)
    : rowsPerPage;

  useEffect(() => {
    if (!useServerPaging) setPage(0);
    // eslint-disable-next-line
  }, [filters.map((f) => f.value).join(",")]);

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        p: { xs: 1.5, sm: 2 },
        borderRadius: "var(--app-radius)",
        boxShadow: "var(--app-shadow-sm)",
        bgcolor: "#fff",
        border: "1px solid var(--app-border)",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        alignItems={{ xs: "stretch", sm: "center" }}
        mb={2}
        useFlexGap
        flexWrap="wrap"
      >
        {filters.map((filter) =>
          filter.type === "search" ? (
            <FormControl
              size="small"
              key={String(filter.field)}
              sx={{ minWidth: { xs: "100%", sm: 220 }, bgcolor: "#fff" }}
              variant="outlined"
            >
              <OutlinedInput
                id={String(filter.field)}
                type="search"
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                placeholder={filter.placeholder || filter.label}
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
                }}
              />
            </FormControl>
          ) : (
            <FormControl
              size="small"
              key={String(filter.field)}
              sx={{ minWidth: { xs: "100%", sm: 150 } }}
            >
              <InputLabel>{filter.label}</InputLabel>
              <Select
                label={filter.label}
                value={filter.value || "ALL"}
                onChange={(e) => filter.onChange(e.target.value)}
                sx={{ borderRadius: 3, bgcolor: "#fff" }}
              >
                {filter.options?.map((opt) => (
                  <MenuItem value={opt.value} key={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        )}
      </Stack>

      <TableContainer
        sx={{
          borderRadius: 3,
          border: "1px solid #eef2f7",
          overflowX: "auto",
        }}
      >
        <Table
          size={dense ? "small" : "medium"}
          sx={{
            "& thead th": {
              bgcolor: "#f4f7fb",
              fontWeight: 700,
              color: "#2d3a4a",
              borderBottom: "2px solid #e2e8f0",
            },
            "& tbody tr:hover": {
              bgcolor: "#f8fafc",
              transition: "background 0.2s",
            },
            "& tbody td": {
              borderBottom: "1px solid #f0f1f4",
            },
            minWidth: 750,
          }}
        >
          <TableHeader columns={columns} />
          <TableBodyContent
            columns={columns}
            data={paginatedData}
            loading={loading}
            emptyText={emptyText}
            skeletonRows={skeletonRows}
            useServerPaging={useServerPaging}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={useServerPaging ? (pagination?.total ?? 0) : filteredData.length}
        rowsPerPage={useServerPaging ? pagination!.limit : rowsPerPage}
        page={useServerPaging ? pagination!.page - 1 : page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={t`Rows per page:`}
        sx={{
          mt: 1,
          ".MuiTablePagination-toolbar": { minHeight: 50 },
          ".MuiTablePagination-actions": { mx: 1 },
        }}
      />
    </Paper>
  );
}
