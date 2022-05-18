import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Grid, Typography } from "@mui/material";
import { getReportBySprintIdRoute } from "../../../api/routes";
import { DashboardLayout } from "../../../components/layouts/DashboardLayout";
import { PieChart } from "../../../components/PieChart";
import { BarsChart } from "../../../components/BarsChart";

type StatsType = {
  bars: {
    estimatedDueTimeInHours: number;
    totalSpentTimeInHours: number;
  }[];
  cheese: {
    analysisTasksAmount: number;
    closedTasksAmount: number;
    inProgressTasksAmount: number;
  };
};

const SprintStats = () => {
  const router = useRouter();
  const { sprintId } = router.query;
  const [stats, setStats] = useState<StatsType>();
  const [isStatsLoading, setIsStatsLoading] = useState();

  useEffect(() => {
      console.log(sprintId)
    if (!sprintId || Array.isArray(sprintId)) {
      return;
    }
    axios
      .get(getReportBySprintIdRoute(sprintId))
      .then((res) => setStats(res.data))
      .catch(() => toast.error("Произошла ошибка при выгрузки статистики"));
  }, []);

  return (
    <DashboardLayout title="Stats | Pahlava">
      <Typography sx={{ mb: 2 }} variant="h3">
        Статистика спринта
      </Typography>
      {stats && (
        <Grid container spacing={2}>
          <Grid xs={5} item>
            <PieChart
              values={[
                stats.cheese.analysisTasksAmount,
                stats.cheese.inProgressTasksAmount,
                stats.cheese.closedTasksAmount,
              ]}
            />
          </Grid>
          <Grid xs={5} item>
            <BarsChart
              est={stats.bars.map((el) => el.estimatedDueTimeInHours)}
              total={stats.bars.map((el) => el.totalSpentTimeInHours)}
            />
          </Grid>
        </Grid>
      )}
    </DashboardLayout>
  );
};

export default SprintStats;
