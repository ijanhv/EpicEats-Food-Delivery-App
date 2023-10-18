"use client";
import { CalendarDateRangePicker } from "@/components/dashboard/DateRangePicker";
import { columns } from "@/components/table/today/Columns";
import { DataTable } from "@/components/table/today/DataTable";

import { Button } from "@/components/ui/button";
import { useFetchOrdersQuery, useFetchTodaysOrdersQuery } from "@/hooks/useOrders";

export default function OrdersPage() {
  const { data, isLoading, isError, refetch } = useFetchTodaysOrdersQuery();
  console.log(data);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Recent Orders</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <DataTable  columns={columns} data={data}/>
        </div>
      </div>
    </>
  );
}
