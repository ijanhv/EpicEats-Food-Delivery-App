import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

import { DataTablePagination } from "../common/DataTablePagination";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import DataTableToolbar from "./DataTableToolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const toggleAccordion = (itemId: string) => {
    if (openItems.includes(itemId)) {
      setOpenItems(openItems.filter((id) => id !== itemId));
    } else {
      setOpenItems([...openItems, itemId]);
    }
  };

  const categories = [
    { label: "All", value: "All" },
    { label: "Snacks", value: "snacks" },
    { label: "South Indian", value: "South Indian" },
    { label: "Chinese", value: "Chinese" },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },

    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <>
      <DataTableToolbar table={table} />
      {table.getColumn("category") && (
        <DataTableFacetedFilter
          column={table.getColumn("category")}
          title="Category"
          options={categories}
        />
      )}
      <div className="mt-4 border rounded-md dark:border-gray-600">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    className="cursor-pointer"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const cellValue = cell.getValue();

                      return (
                        <TableCell
                          key={cell.id}
                          onClick={() => toggleAccordion(row.id)}
                        >
                          {cellValue === null || cellValue === ""
                            ? "---"
                            : typeof cellValue === "string" &&
                              cellValue.length > 20
                            ? cellValue.substring(0, 15) + "..."
                            : flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="my-3">
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
