import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

type AuthFormProps = {
  onSuccess: () => void;
};

const API_URL = "https://job-search-backend-k5v2.onrender.com/api/auth";

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "At least 6 chars").required("Required"),
      name: isLogin ? Yup.string() : Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setError("");
      try {
        if (isLogin) {
          // логин
          await axios.post(`${API_URL}/login`, {
            email: values.email,
            password: values.password,
          });
        } else {
          // регистрация
          await axios.post(`${API_URL}/register`, {
            email: values.email,
            password: values.password,
            name: values.name,
          });
        }
        onSuccess();
      } catch (e: any) {
        setError(e.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? "Sign In" : "Register"}
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full border px-3 py-2 rounded"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-600 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full border px-3 py-2 rounded"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full border px-3 py-2 rounded"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-600 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>

        {error && <div className="text-red-600">{error}</div>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {isLogin ? "Sign In" : "Register"}
        </button>
      </form>

      <button
        className="mt-4 text-sm underline text-blue-600"
        onClick={() => {
          setError("");
          setIsLogin(!isLogin);
        }}
      >
        {isLogin ? "Create an account" : "Already have an account? Sign In"}
      </button>
    </div>
  );
};

export default AuthForm;
