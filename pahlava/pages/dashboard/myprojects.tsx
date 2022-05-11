import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { getAuthToken } from "../../api/cookieStorage";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  GetAllProjectsByUserIdRoute,
  postAllProjectsRoute,
} from "../../api/routes";
import { Box } from "@mui/system";
import toast from "react-hot-toast";

type Project = {
  projectId: string;
  userId: string;
  projectName: string;
  isTracked: boolean;
};

const MyProjects = ({ uuid }: { uuid: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [projects, setProjects] = useState<Project[]>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(GetAllProjectsByUserIdRoute(uuid))
      .then((res) => {
        if (res?.data && res?.status === 200) {
          setProjects(res.data as Project[]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
            <Button onClick={saveProjects} variant="outlined" sx={{ width: 80, mt: 3 }}>
              Изменить
            </Button>
          </>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
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
  const { uuid } = JSON.parse(token) as { uuid: string };
  return {
    props: {
      uuid,
    },
  };
};

export default MyProjects;
