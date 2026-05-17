"use client"; // If you're using the app directory, ensure client mode

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Remove token from storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("token"); 
    }

    // Redirect to login page after logout
    router.push("/signin");
  }, [router]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Logging you out...</h2>
    </div>
  );
}
