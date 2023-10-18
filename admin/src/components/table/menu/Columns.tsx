import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<MenuItem>[] = [
  {
    id: "image",
    header: () => <div className="text-center">Image</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3 mx-2">
          <Avatar className="w-20 h-full rounded-full">
            <AvatarImage
              src={row.original.image as string}
              alt="@shadcn"
              className="object-cover rounded-full"
            />
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "_id",
    header: "Menu Item ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },

  {
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    accessorKey: "category",
    header: "Category",
    filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          <span
            className={`bg-orange-400 px-2 py-1 text-xs font-bold leading-none text-white uppercase rounded-full`}
          >
            {row.original.category}
          </span>
        </div>
      );
    },
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
