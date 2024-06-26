"use client";
import { CalendarDateRangePicker } from "@/components/dashboard/DateRangePicker";
import Loader from "@/components/loading/Loader";
import { columns } from "@/components/table/menu/Columns";
import { DataTable } from "@/components/table/menu/DataTable";
import { Button } from "@/components/ui/button";
import { useFetchMenuItemsQuery } from "@/hooks/useMenuItems";

export default function MenuItems() {
  const { data, isLoading, isError, refetch } = useFetchMenuItemsQuery();



  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Menu Items</h2>
          </div>
        </div>
        <div className="mt-10">
         {isLoading ? <Loader /> : isError ? <div>Something went wrong</div> : <DataTable columns={columns} data={data} />}
        </div>
      </div>
    </>
  );
}
