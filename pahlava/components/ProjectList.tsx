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
  },
};

export type Project = {
  projectId: string;
  userId: string;
  projectName: string;
  isTracked: boolean;
};

type Props = {
  projects: Project[];
  onProjectClick: (projectid: string) => void;
};

const ProjectList = ({ projects, onProjectClick }: Props) => {
  return (
    <>
      {projects.map((p) => (
        <Box
          sx={styles.project}
          key={p.projectId}
          onClick={() => onProjectClick(p.projectId)}
        >
          <Typography sx={styles.projectTitle} variant="body1">
            {p.projectName}
          </Typography>
        </Box>
      ))}
    </>
  );
};

export default ProjectList;
