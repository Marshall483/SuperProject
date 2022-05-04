import { ReactNode, useState } from "react";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import Head from "next/head";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

interface Props {
  children: ReactNode;
  title: string;
}

export const DashboardLayout = (props: Props) => {
  const { children, title } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <DashboardLayoutRoot>
        <Head>
          <title>{title}</title>
        </Head>
        <Container
          maxWidth={false}
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            pt: 2,
          }}
        >
          {children}
        </Container>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};
