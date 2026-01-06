"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DashboardRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-lg">Redirecting to dashboard...</div>
    </div>
  );
};

export default DashboardRedirect;
