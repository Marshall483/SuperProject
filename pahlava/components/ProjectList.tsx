import { Box, Typography } from "@mui/material";

const styles = {
    project: {
      width: "100%",
      px: 3,
      py: 2,
      marginBottom: 1,
      border: "1px solid",
      borderRadius: 2,
      borderColor: "neutral.200",
      cursor: "pointer",
      color: "text.secondary",
  
      "&:hover": {
        bgcolor: "neutral.100",
        transition: "all .1 ease-in",
        color: "text.primary",
      },
    },
    projectTitle: {
      color: "inherit",
      fontWeight: 600,
    }
  };

const ProjectList = () => {
  return (
    <>
      <Box sx={styles.project}>
        <Typography sx={styles.projectTitle} variant="body1">
          Проект 1
        </Typography>
      </Box>
      <Box sx={styles.project}>
        <Typography sx={styles.projectTitle} variant="body1">
          Проект 2
        </Typography>
      </Box>
    </>
  );
};

export default ProjectList;
