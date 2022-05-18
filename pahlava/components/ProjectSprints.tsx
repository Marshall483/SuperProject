import { Box, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";

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
  return (
    <Paper sx={styles.description}>
      <Typography sx={{ mb: 2 }} variant="h5">
        Спринты
      </Typography>
      {isLoading === undefined && <Typography variant="h6" sx={{color: 'neutral.200',  my: 4}}>Выберите проект для отображения спринтов</Typography>}
      {isLoading === true && <Box sx={{textAlign: 'center', my: 4}}><CircularProgress /></Box>}
      {isLoading === false && sprints.map((s) => (
        <Box sx={styles.sprintBox} key={s.sprintId}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            {s.sprintName}
          </Typography>
          <Box sx={styles.sprintButtonsBlock}>
            <Button variant="contained">
              <Typography variant="body2">Выгрузить в Telegram</Typography>
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
