"use client";

import Login from "@/src/components/Login";
import { AuthContext } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push("/create");
    }
  }, [token]);
  return (
    <>
      <Login />
    </>
  );
}
