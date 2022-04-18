import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const Home = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: () => {
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
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="почта"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
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
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                variant="contained"
              >
                {isLoginPage ? "Войти" : "Зарегистрироваться"}
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              {isLoginPage ? "Нет аккаунта" : "Есть аккаунт"}?{" "}
              <Link
                underline="hover"
                onClick={() => {
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
