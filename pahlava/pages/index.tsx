import Head from "next/head";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { newUserRegisterRoute, userLoginRoute, userRegisterRoute } from "../api/routes";
import { setAuthToken } from "../api/cookieStorage";
import {
  loginFormSchema,
  registerFormSchema,
} from "../utils/validationSchemas";

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const formik = useFormik({
    initialValues: {
      login: "",
      name: "",
      password: "",
      telegramAlias: "",
    },
    validationSchema: isLoginPage ? loginFormSchema : registerFormSchema,
    onSubmit: async (user, { resetForm }) => {
      setIsLoading(true);
      try {
        if (isLoginPage) {
          const res = await axios.post(userLoginRoute, user);
          const res2 = await axios.post(newUserRegisterRoute, { userGuid: res.data.uuid })
          setIsLoading(false);
          if (res.status === 200 && res2.status === 200) {
            const token = res?.data;
            if (token) {
              setAuthToken(JSON.stringify(token));
              router.push("/dashboard");
            }
          }
          return;
        }
        const res = await axios.post(userRegisterRoute, user);
        setIsLoading(false);
        if (res.status === 200) {
          toast.success("Пользователь успешно добавлен");
          resetForm();
          setIsLoginPage(true);
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Случилось что-то плохое, попробуйте перезагрузить страницу либо свяжитесь с поддержкой"
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
                Требуется {isLoginPage ? "авторизация" : "регистрация"} для
                использования платформы
              </Typography>
            </Box>
            {!isLoginPage && (
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Имя"
                margin="normal"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.name}
                variant="outlined"
              />
            )}
            <TextField
              error={Boolean(formik.touched.login && formik.errors.login)}
              fullWidth
              helperText={formik.touched.login && formik.errors.login}
              label="Почта"
              margin="normal"
              name="login"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.login}
              variant="outlined"
            />
            {!isLoginPage && (
              <TextField
                error={Boolean(
                  formik.touched.telegramAlias && formik.errors.telegramAlias
                )}
                fullWidth
                helperText={
                  formik.touched.telegramAlias && formik.errors.telegramAlias
                }
                label="Имя в Telegram"
                margin="normal"
                name="telegramAlias"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.telegramAlias}
                variant="outlined"
              />
            )}
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Пароль"
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
                {!isLoading && (isLoginPage ? "Войти" : "Зарегистрироваться")}
                {isLoading && <CircularProgress color="inherit" />}
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              {isLoginPage ? "Нет аккаунта" : "Есть аккаунт"}?{" "}
              <Link
                underline="hover"
                onClick={() => {
                  formik.resetForm();
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
