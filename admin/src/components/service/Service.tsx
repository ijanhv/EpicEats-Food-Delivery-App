import { useFetchAllServices } from "@/hooks/useService";
import { LoaderIcon } from "lucide-react";
import React from "react";

const Service = () => {
  const { data, isLoading, isError } = useFetchAllServices();
  if (isLoading)
    return (
      <div className="h-96 w-full">
        <LoaderIcon className="animate-spin w-10 h-10 mx-auto" />
      </div>
    );
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((service: any) => (
        <div
          key={service._id}
          className="flex items-center justify-between p-4 border shadow-sm rounded-md"
        >
          <div>
            <h3>{service.user.name}</h3>
            <p>{service.user.email}</p>
            <p>{service.user.mobile}</p>
          </div>
          <div>
            <h3>{service.location}</h3>
            <p>{service.serviceType}</p>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Service;
