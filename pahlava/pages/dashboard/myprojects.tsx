import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import EmptyWarn from "../../components/EmptyWarn";
import { Project } from "../../components/ProjectList";
import { getMyProjects, setMyProjects } from "../../api/cookieStorage";
import {
  getAllProjectsByUserIdRoute,
  postAllProjectsRoute,
} from "../../api/routes";
import { getServerSidePropsWithUserUUID } from "../../utils/getServerSideProps";

const styles = {
  emptyProjects: {
    maxWidth: 400,
    transition: "all 1s ease",
    p: 4,
    mt: 2,
  },
  main: {
    maxWidth: 400,
    minHeight: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    py: 2,
    px: 4,
    mt: 2,
  },
  spinner: {
    width: "100%",
    height: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const MyProjects = ({ uuid }: { uuid: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isProjectsEmpty, setIsProjectsEmpty] = useState<boolean>(true);
  const [projects, setProjects] = useState<Project[]>();

  useEffect(() => {
    const savedProjects = getMyProjects();
    if (savedProjects) {
      setIsProjectsEmpty(false);
    }
    setIsLoading(true);
    axios
      .get(getAllProjectsByUserIdRoute(uuid))
      .then((res) => {
        if (res?.data && res?.status === 200) {
          setProjects(res.data as Project[]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [uuid]);

  const saveProjects = () => {
    if (projects) {
      setIsLoading(true);
      axios
        .post(postAllProjectsRoute, projects)
        .then(() => toast.success("данные обновлены"))
        .catch(() => {
          toast.error("произошло что-то плохое. Перезагрузите страницу");
        })
        .finally(() => {
          setIsLoading(false);
        });
      const activeProjects = projects.filter((el) => el.isTracked === true);
      if (activeProjects.length > 0) {
        setMyProjects(JSON.stringify(activeProjects));
        setIsProjectsEmpty(false);
      }
    }
  };

  const setCheckedById = (projectId: string) => {
    setProjects((projects) =>
      projects?.map((p) => {
        if (p.projectId == projectId) {
          return {
            ...p,
            isTracked: !p.isTracked,
          };
        }
        return p;
      })
    );
  };

  return (
    <DashboardLayout title="My Projects | Pahlava">
      <Typography variant="h2">Мои проекты</Typography>
      {isProjectsEmpty && (
        <EmptyWarn text="Требуется отметить проекты для использования сервиса" />
      )}
      <Paper sx={styles.main}>
        {isLoading == false ? (
          <>
            <FormGroup>
              {projects?.map((project) => (
                <FormControlLabel
                  checked={project.isTracked}
                  key={project.projectId}
                  control={<Checkbox defaultChecked />}
                  label={project.projectName}
                  onClick={() => {
                    setCheckedById(project.projectId);
                  }}
                />
              ))}
            </FormGroup>
            <Button
              onClick={saveProjects}
              variant="outlined"
              sx={{ width: 80, mt: 3 }}
            >
              Изменить
            </Button>
          </>
        ) : (
          <Box sx={styles.spinner}>
            <CircularProgress />
          </Box>
        )}
      </Paper>
    </DashboardLayout>
  );
};

export const getServerSideProps = getServerSidePropsWithUserUUID;

export default MyProjects;
