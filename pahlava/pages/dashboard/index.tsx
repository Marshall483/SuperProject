import { DashboardLayout } from "../../components/dashboard-layout";
import { GetServerSidePropsContext } from "next";
import { getAuthToken } from "../../api/cookieStorage";

const Dashboard = () => (
  <DashboardLayout title="">
      
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
