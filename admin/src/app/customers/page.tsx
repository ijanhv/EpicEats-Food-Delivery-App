"use client";

import Loader from "@/components/loading/Loader";
import { columns } from "@/components/table/customer/Columns";
import { DataTable } from "@/components/table/customer/DataTable";

import { useFetchCustomersQuery } from "@/hooks/useCustomer";

export default function CustomersPage() {
  const { data, isLoading, isError } = useFetchCustomersQuery();

  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">All customers</h2>
          </div>
        </div>
        <div className="mt-10">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div>Something went wrong</div>
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </div>
      </div>
    </>
  );
}
