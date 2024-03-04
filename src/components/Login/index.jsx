"use client";

import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import { BoxContainer } from "@/src/styles/Login/LoginStyle";
import InputField from "../shared/InputField";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "@/src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const { setToken, setUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    values,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const res = await axios.post("http://localhost:5000/api/login", values);
        if (res) {
          setToken(res.data.token);
          setUser(res.data.user);
          toast.success(res.data.msg);
          router.push("/create");
        }
      } catch (error) {
        toast.error(error.response.data.msg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <BoxContainer>
      <Box className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={values.email}
            handleChange={handleChange}
            error={errors.email}
            touched={touched.email}
            handleBlur={handleBlur}
          />
          <InputField
            label="Password"
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            name="password"
            value={values.password}
            handleChange={handleChange}
            error={errors.password}
            touched={touched.password}
            handleBlur={handleBlur}
            icon={
              show ? (
                <Visibility sx={{ fontSize: "18px" }} />
              ) : (
                <VisibilityOff sx={{ fontSize: "18px" }} />
              )
            }
            setShow={setShow}
          />
          <button type="submit">
            {isSubmitting ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </Box>
    </BoxContainer>
  );
};

export default Login;
