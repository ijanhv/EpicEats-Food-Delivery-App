import React, { useRef } from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

import { useRouter } from "next/router";
import { Label } from "@/components/ui/label";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";



interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {



 

  return (
    <div className="items-center">
      <div className="flex flex-col items-center justify-between flex-1 text-left sm:flex-row md:space-x-2">
        <div className="flex items-center gap-3">
          {/* <h1 className="text-3xl font-bold">{capitalizedString}</h1> */}
        </div>
        <div className="flex gap-4 mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>



          <Button variant="outline" >
            Export
          </Button>

        </div>
      </div>
      <div className="flex mx-auto my-5 space-x-2">
        <div className="flex items-center gap-3 ">
          <Label className="hidden lg:block">Email</Label>
          <Input
            placeholder="Search "
            value={(table.getColumn("customer.email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("customer.email")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[100px] lg:w-[200px]"
          />
       
          <Label className="hidden lg:block">Order Id</Label>
          <Input
            placeholder="Search "
            value={
              (table.getColumn("_id")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("_id")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[100px] lg:w-[200px]"
          />
        </div>
      </div>
      <div className="space-x-3">
       
        {/* // {table.getColumn("city") && (
        //   <DataTableFacetedFilter
        //     column={table.getColumn("city")}
        //     title="City"
        //     options={availableCity}
        //   />
        // )}  */}
      </div>
    </div>
  );
}