import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { time } from "console";
import fileDownload from "js-file-download";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { getXLSXRoute, postXLSXRoute } from "../api/routes";

const styles = {
  description: {
    px: 4,
    py: 2,
    width: "100%",
  },
  sprintBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    mt: 3,
  },
  sprintButtonsBlock: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    rowGap: "2px",
    columnGap: 1,
  },
};

export type Sprint = {
  projectId: string;
  sprintId: string;
  sprintName: string;
};

type Props = {
  sprints: Sprint[];
  isLoading?: boolean;
};

const ProjectSprints = ({ sprints, isLoading }: Props) => {
  const router = useRouter();

  const fetchXLSX = (sprintId: string) => {
    let timer: NodeJS.Timer;
    axios
      .post(postXLSXRoute, { id: sprintId, telegramAlias: "string" })
      .then((res) => {
        timer = setInterval(() => {
          axios
            .get(getXLSXRoute(res.data), { responseType: "blob" })
            .then((res) => {
              fileDownload(res.data, "doc.xlsx");
              clearInterval(timer);
            })
            .catch((err) => {
              toast.loading(err.response.message || "идет загрузка");
            });
        }, 2000);
      });
  };

  return (
    <Paper sx={styles.description}>
      <Typography sx={{ mb: 2 }} variant="h5">
        Спринты
      </Typography>
      {isLoading === undefined && (
        <Typography variant="h6" sx={{ color: "neutral.200", my: 4 }}>
          Выберите проект для отображения спринтов
        </Typography>
      )}
      {isLoading === true && (
        <Box sx={{ textAlign: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {isLoading === false &&
        sprints.map((s) => (
          <Box sx={styles.sprintBox} key={s.sprintId}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              {s.sprintName}
            </Typography>
            <Box sx={styles.sprintButtonsBlock}>
              <Button variant="contained">
                <Typography
                  variant="body2"
                  onClick={() => fetchXLSX(s.sprintId)}
                >
                  Выгрузить в XLSX
                </Typography>
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => router.push(`/dashboard/sprints/${s.sprintId}`)}
              >
                <Typography variant="body2">Визуализировать</Typography>
              </Button>
            </Box>
          </Box>
        ))}
    </Paper>
  );
};

export default ProjectSprints;
