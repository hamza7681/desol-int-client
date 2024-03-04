"use client";

import React from "react";
import AuthProvider from "./AuthContext";

const Provider = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Provider;
