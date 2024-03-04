"use client";

import Create from "@/src/components/Create";
import { AuthContext } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const CreatePage = () => {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);
  return (
    <>
      <Create />
    </>
  );
};

export default CreatePage;
