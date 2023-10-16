import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {  format } from "date-fns";

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
      const status = row.original.status;
      return (
        <div className="text-right font-medium">
          <span
            className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white uppercase  rounded-full`}
          >
            {status}
          </span>
        </div>
      );


    },
  },

  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        const formattedDate = format(date, "dd MMM yyyy");
   
        return <div className="text-right font-medium">{formattedDate}</div>
        }
    

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
