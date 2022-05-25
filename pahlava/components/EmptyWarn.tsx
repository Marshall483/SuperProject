import { Paper, Typography } from "@mui/material";

type Props = {
  width?: number;
  text: string;
};

const styles = {
  warn: {
    my: 1,
    p: 2,
    color: "neutral.200",
    transition: "all 1s ease",
  },
};

const EmptyWarn = ({ width = 400, text }: Props) => {
  return (
    <Paper sx={{ ...styles.warn, width }}>
      <Typography variant="h6">{text}</Typography>
    </Paper>
  );
};

export default EmptyWarn;
