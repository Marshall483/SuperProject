import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { authApi, setAuthToken } from "../api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const formik = useFormik({
    initialValues: {
      login: "",
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      login: Yup.string()
        .email("must be a valid email")
        .max(255)
        .required("Email is required"),
      name: Yup.string().min(2, "Name must be longer").max(15, 'Name too long').required(),
      password: Yup.string().min(2, "Name must be longer").max(15, 'Password too long').required("Password is required"),
    }),
    onSubmit: async (user, { resetForm }) => {
      setIsLoading(true);
      try {
        if (isLoginPage) {
          const res = await authApi.post("/user/login", user);
          setIsLoading(false);
          if (res.status === 200) {
            const token = res?.data?.token;
            if (token) {
              setAuthToken(token)
              router.push("/dashboard");
            } 
          }
          return;
        }
        const res = await authApi.post("/user/register", user);
        setIsLoading(false);
        if (res.status === 200) {
          toast.success("User successfuly added");
          resetForm();
          setIsLoginPage(true);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Something bad happened, try reload the page or contact with administrator"
        );
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>{isLoginPage ? "Вход" : "Регистрация"} | Pahlava</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                {isLoginPage ? "Вход в систему" : "Регистрация"}
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Требуется {isLoginPage ? "авторизация" : "Регистрация"} для
                использования платформы
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="имя"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.login && formik.errors.login)}
              fullWidth
              helperText={formik.touched.login && formik.errors.login}
              label="почта"
              margin="normal"
              name="login"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.login}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="пароль"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting || isLoading}
                fullWidth
                type="submit"
                size="large"
                variant="contained"
              >
                {!isLoading && (isLoginPage  ? "Войти" : "Зарегистрироваться")}
                {isLoading && <CircularProgress color="inherit"/>}
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              {isLoginPage ? "Нет аккаунта" : "Есть аккаунт"}?{" "}
              <Link
                underline="hover"
                onClick={() => {
                  formik.resetForm()
                  setIsLoginPage((s) => !s);
                }}
                sx={{
                  cursor: "pointer",
                }}
              >
                {isLoginPage ? "Регистрация" : "Вход"}
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Home;
