import { Box, Button, Grid, Paper, Typography } from "@mui/material";
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
    flexWrap: "wrap",
    alignItems: "center",
    mb: 2,
  },
  buttonBox: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    maxHeight: 44,
    columnGap: 2,
    rowGap: 1,
  },
};

const ProjectSprints = () => {
  const router = useRouter();
  return (
    <Paper sx={styles.description}>
      <Typography sx={{ mb: 2 }} variant="h5">
        Спринты
      </Typography>
      <Box sx={styles.sprintBox}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Мой Супер спринт
        </Typography>
        <Box sx={styles.buttonBox}>
          <Button variant="contained">Выгрузить отчет в Telegram</Button>
          <Button variant="contained" color="success" onClick={() => router.push(`/dashboard/sprints/12`)}>
            Визуализировать
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProjectSprints;
