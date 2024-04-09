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

export const columns: ColumnDef<Customer>[] = [

  {
    accessorKey: "name",
    header: "Customer Name",
  },
  {
    accessorKey: "email",
    header: "Customer Email",
  },
  {
    accessorKey: "mobile",
    header: "Customer Phone",
  },
  
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
         
            {format(new Date(row.original.createdAt), "PPP")}

        </div>
      );
    }
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          <span
            className={`bg-orange-400 capitalize px-2 py-1 text-xs font-bold leading-none text-white uppercase rounded-full`}
          >
            {row.original.role}
          </span>
        </div>
      );
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
