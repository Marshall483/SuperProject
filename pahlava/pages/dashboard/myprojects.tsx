import { DashboardLayout } from "../../components/dashboard-layout";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { getAuthToken } from "../../api/cookieStorage";

const MyProjects = () => {
  return (
    <DashboardLayout title="My Projects | Pahlava">
      <Typography variant="h2">Мои проекты</Typography>
      <Paper
        sx={{
          maxWidth: 400,
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          py: 2,
          px: 4,
          my: 2,
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Label"
          />
          <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
        </FormGroup>
        <Button variant="outlined" sx={{ width: 80 }}>
          Изменить
        </Button>
      </Paper>
    </DashboardLayout>
  );
};

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

export default MyProjects;
