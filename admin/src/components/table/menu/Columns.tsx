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
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import UpdateMenuItem from "@/components/menu/UpdateMenuItem";

export const columns: ColumnDef<MenuItem>[] = [
  {
    id: "image",
    header: () => <div className="text-center">Image</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-3 mx-2">
          <Avatar className="w-10 h-full rounded-full">
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
    accessorKey: "veg",
    header: "Veg or Non-Veg",
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          <span className="bg-slate-700  border-green-600 w-10 h-10"> 
          </span>
        </div>
      );
    }
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
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium flex flex-wrap">
        {row.original.tags.map((tag) => (
          <span
            key={tag}
            className={`bg-blue-300 border border-blue-400 text-blue-600 dark:bg-blue-400 dark:border-blue-900  dark:text-blue-900 px-2 mx-1 py-0.5 text-xs rounded-full`}
          >
            {tag}
          </span>
        ))}
      </div>
      );
    },
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
      const item = row.original;

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

            <UpdateMenuItem menuItem={item} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
