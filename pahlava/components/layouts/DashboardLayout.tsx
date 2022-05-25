import { ReactNode, useState } from "react";
import Head from "next/head";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";

const LayoutRoot = styled("div")(({ theme }) => ({
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
      <LayoutRoot>
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
      </LayoutRoot>
      <Navbar onSidebarOpen={() => setSidebarOpen(true)} />
      <Sidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </>
  );
};
