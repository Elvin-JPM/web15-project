import React from "react";
const Skeleton = ({ children, loading }) => {
  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-5 w-[250px] rounded-md bg-gray-300 font-bold" />
        <div className="space-y-4">
          <div className="h-4 w-full rounded-md bg-gray-300" />
          <div className="h-4 w-full rounded-md bg-gray-300" />
          <div className="h-4 w-full rounded-md bg-gray-300" />
          <div className="h-4 w-full rounded-md bg-gray-300 sm:w-[450px]" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export { Skeleton };
