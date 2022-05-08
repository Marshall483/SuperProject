import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { GetServerSidePropsContext } from "next";
import { getAuthToken } from "../../api/cookieStorage";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import ProjectList from "../../components/ProjectList";
import ProjectSprints from "../../components/ProjectSprints";

const Dashboard = () => (
  <DashboardLayout title="Main | Pahlava">
    <Typography sx={{ mb: 2 }} variant="h2">
      Главная
    </Typography>
    <Grid spacing={10} container>
      <Grid xs={5} item>
        <ProjectList />
      </Grid>
      <Grid xs={5} item>
        <ProjectSprints />
      </Grid>
    </Grid>
  </DashboardLayout>
);

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

export default Dashboard;
