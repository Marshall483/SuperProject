import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { getAuthToken } from "../../api";

const Dashboard = () => (
  <DashboardLayout>
    <Head>
      <title>Dashboard | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
      </Container>
    </Box>
  </DashboardLayout>
);

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const token = getAuthToken(ctx);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
  return { props: {} };
};

export default Dashboard;
