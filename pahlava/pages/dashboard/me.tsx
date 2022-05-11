import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { getAuthToken } from "../../api/cookieStorage";

const Me = () => {
  return (
    <DashboardLayout title="Me | Pahlava">
      <Typography variant="h2">Аккаунт</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <Paper
            sx={{
              maxWidth: 400,
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              py: 2,
              px: 4,
            }}
          >
            <Typography variant="h5">
              Обязательные поля для использования сервиса
            </Typography>
            <Grid
              sx={{
                display: "grid",
                alignItems: "center",
                gridRowGap: 10,
                mt: 3,
              }}
              spacing={5}
            >
              <Grid>
                <Typography sx={{ mb: 1 }}>Token Jira:</Typography>
                <TextField />
              </Grid>
              <Grid>
                <Typography sx={{ mb: 1 }}>Jira URL:</Typography>
                <TextField />
              </Grid>
              <Grid>
                <Typography sx={{ mb: 1 }}>tg name:</Typography>
                <TextField placeholder="@example" />
              </Grid>
              <Button
                sx={{ mt: 3, width: 150 }}
                variant="outlined"
                color="success"
              >
                Сохранить
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            sx={{
              maxWidth: 500,
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              py: 2,
              px: 4,
            }}
          >
            <Typography variant="h5">Сведения о пользователе</Typography>
            <Grid
              sx={{
                display: "grid",
                alignItems: "center",
                gridRowGap: 10,
                mt: 3,
              }}
              spacing={5}
            >
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ mr: 1 }}>Имя:</Typography>
                <Typography variant="h5">Ivan</Typography>
              </Grid>
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ mr: 1 }}>Почта:</Typography>
                <Typography variant="h5">IvanIvan@gmail.com</Typography>
              </Grid>
              <Grid item sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ mr: 1 }}>Пароль:</Typography>
                <Typography variant="h5">Ivan</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

// export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
//   const token = getAuthToken(ctx);
//   if (!token) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: `/`,
//       },
//     };
//   }
//   return { props: {} };
// };

export default Me;
