import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { DashboardLayout } from "../../../components/layouts/DashboardLayout";
import { PieChart } from "../../../components/PieChart";

const SprintStats = () => {
  const router = useRouter();
  const { sprintId } = router.query;
  return (
    <DashboardLayout title="Stats | Pahlava">
      <Typography sx={{mb: 2}} variant="h3" >Статистика спринта</Typography>
      <Grid container spacing={2}>
          <Grid xs={5} item>
             <PieChart />
          </Grid>
          <Grid xs={5} item>
              
          </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default SprintStats;
