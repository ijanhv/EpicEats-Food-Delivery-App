import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "_id",
    header: "Order ID",
  },
  {
    accessorKey: "customer.name",
    header: "Customer Name",
  },
  {
    accessorKey: "customer.email",
    header: "Customer Email",
  },
  {
    accessorKey: "customer.mobile",
    header: "Customer Phone",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          <span
            className={`bg-orange-400 px-2 py-1 text-xs font-bold leading-none text-white uppercase rounded-full`}
          >
            {row.original.status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAtDate",
    header: "Date",
  },
  {
    accessorKey: "createdAtTime",
    header: "Time",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const sales = row.original;
      // console.log(sales.id);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="mt-2">
              View All Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
