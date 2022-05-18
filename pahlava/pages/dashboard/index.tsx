import axios from "axios";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import ProjectList, { Project } from "../../components/ProjectList";
import ProjectSprints, { Sprint } from "../../components/ProjectSprints";
import EmptyWarn from "../../components/EmptyWarn";
import {
  getAllActiveProjectsByUserIdRoute,
  getAllSprintsByProjectIdRoute,
} from "../../api/routes";
import {
  getJiraToken,
  getMyProjects,
} from "../../api/cookieStorage";
import { getServerSidePropsWithUserUUID } from "../../utils/getServerSideProps";

const Dashboard = ({ uuid }: { uuid: string }) => {
  const [isEmptyJira, setIsEmtyJira] = useState<boolean>();
  const [isEmptyProjects, setIsEmptyProjects] = useState<boolean>();
  const [isProjectsLoading, setIsProjectsLoading] = useState<boolean>();
  const [isSprintsLoading, setIsSprintsLoading] = useState<boolean>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);

  const isWarnExist = (): boolean => {
    const projects = getMyProjects();
    const jiraCreds = getJiraToken();
    setIsEmptyProjects(!Boolean(projects));
    setIsEmtyJira(!Boolean(jiraCreds));
    return !(projects || jiraCreds);
  };

  useEffect(() => {
    if (isWarnExist()) {
      return;
    }
    setIsProjectsLoading(true);
    axios
      .get(getAllActiveProjectsByUserIdRoute(uuid))
      .then((res) => {
        setProjects(res.data);
        setIsProjectsLoading(false);
      })
      .catch(() =>
        toast.error("произошла ошибка при получении списка проектов")
      );
  }, []);

  const onProjectClick = (projectId: string) => {
    setIsSprintsLoading(true);
    axios
      .get(getAllSprintsByProjectIdRoute(projectId))
      .then((res) => {
        setSprints(res.data);
        setIsSprintsLoading(false);
      })
      .catch(() =>
        toast.error("произошла ошибка при получении списка спринтов")
      );
  };

  return (
    <DashboardLayout title="Main | Pahlava">
      <Typography sx={{ mb: 2 }} variant="h2">
        Главная
      </Typography>
      {(isEmptyJira === undefined || isEmptyProjects === undefined) && (
        <Box
          sx={{ width: "100%", height: "100%", textAlign: "center", pt: "20%" }}
        >
          <CircularProgress />
        </Box>
      )}
      {isEmptyJira && (
        <EmptyWarn text="Введите данные о Jire для использования сервиса" />
      )}
      {isEmptyProjects && (
        <EmptyWarn text=" Введите список активных проектов для использования сервиса" />
      )}

      {isEmptyJira === false && isEmptyProjects === false && (
        <Grid spacing={10} container>
          <Grid xs={5} item>
            {isProjectsLoading ? (
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <ProjectList
                projects={projects}
                onProjectClick={onProjectClick}
              />
            )}
          </Grid>
          <Grid xs={5} item>
            <ProjectSprints isLoading={isSprintsLoading} sprints={sprints} />
          </Grid>
        </Grid>
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = getServerSidePropsWithUserUUID;

export default Dashboard;
