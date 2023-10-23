import { Skeleton } from "@/components/ui/skeleton";

import React from "react";

const Loader = () => {
  return (
    <div className="space-y-3">
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-14" />

    </div>
  );
};

export default Loader;
