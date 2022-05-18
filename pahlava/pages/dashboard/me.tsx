import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { getAuthToken, getJiraToken } from "../../api/cookieStorage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MeForm from "../../components/MeForm";
import { getServerSidePropsWithUserUUID } from "../../utils/getServerSideProps";

type JiraObj = {
  url?: string;
  token?: string;
};

type UserObj = {
  uuid?: string;
  login?: string;
  name?: string;
  password?: string;
  telegramAlias?: string;
};

const styles = {
  flexCenter: { display: "flex", alignItems: "center" },
  userBlock: {
    maxWidth: 500,
    minHeight: 200,
    display: "flex",
    flexDirection: "column",
    py: 2,
    px: 4,
  },
  userGrid: {
    display: "grid",
    alignItems: "center",
    gridRowGap: 10,
    mt: 3,
  },
  spinnerBox: {
    width: "100%",
    height: 90,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  jiraBlock: {
    maxWidth: 500,
    minHeight: 200,
    display: "flex",
    flexDirection: "column",
    mt: 2,
    py: 2,
    px: 4,
  },
  jiraGrid: {
    display: "grid",
    alignItems: "center",
    gridRowGap: 10,
    mt: 3,
  },
  jiraShortText: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: 100,
  },
  jiraTextGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

const Me = () => {
  const [jiraIsLoading, setJiraisLoading] = useState<boolean>(true);
  const [jiraObj, setJiraObj] = useState<JiraObj>({});
  const [userObj, setUserObj] = useState<UserObj>({});

  useEffect(() => {
    const jiraToken = getJiraToken();
    if (jiraIsLoading === false) {
      try {
        const jiraObject = JSON.parse(jiraToken) as JiraObj;
        if (jiraObject?.token && jiraObject?.url) {
          setJiraObj(jiraObject);
        }
      } catch {
        console.error("error while parsing jira object");
      }
    }
  }, [jiraIsLoading]);

  useEffect(() => {
    const authToken = getAuthToken();
    try {
      const userObject = JSON.parse(authToken) as UserObj;
      if (
        userObject?.login ||
        userObject?.name ||
        userObject?.password ||
        userObject?.telegramAlias ||
        userObject?.uuid
      ) {
        setUserObj(userObject);
      }
    } catch {
      console.error("error while parsing user object");
    }
    setJiraisLoading(false);
  }, []);

  const onCopy = (copyText?: string) => {
    if (copyText) {
      navigator.clipboard.writeText(copyText);
      toast.success("скопировано");
    }
  };

  return (
    <DashboardLayout title="Me | Pahlava">
      <Typography variant="h2">Аккаунт</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <MeForm setIsLoading={setJiraisLoading} isLoading={jiraIsLoading} />
        </Grid>
        <Grid item>
          <Paper sx={styles.userBlock}>
            <Typography variant="h5">Сведения о пользователе</Typography>
            <Grid sx={styles.userGrid} spacing={5}>
              {jiraIsLoading ? (
                <Box sx={styles.spinnerBox}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Grid item sx={styles.flexCenter}>
                    <Typography sx={{ mr: 1 }}>Имя:</Typography>
                    <Typography variant="h5">
                      {userObj?.name || "не указан"}
                    </Typography>
                  </Grid>
                  <Grid item sx={styles.flexCenter}>
                    <Typography sx={{ mr: 1 }}>Почта:</Typography>
                    <Typography variant="h5">
                      {userObj?.login || "не указан"}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
          <Paper sx={styles.jiraBlock}>
            <Typography variant="h5">Сведения о JIRA</Typography>
            <Grid sx={styles.jiraGrid} spacing={5}>
              {jiraIsLoading ? (
                <Box sx={styles.spinnerBox}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Grid item sx={styles.jiraTextGrid}>
                    <Box sx={styles.flexCenter}>
                      <Typography sx={{ mr: 1 }}>Token Jira:</Typography>
                      <Typography variant="h5" sx={styles.jiraShortText}>
                        {jiraObj?.token || "не указан"}
                      </Typography>
                    </Box>
                    {jiraObj?.token && (
                      <IconButton
                        aria-label="copy"
                        onClick={() => onCopy(jiraObj?.token)}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    )}
                  </Grid>
                  <Grid item sx={styles.jiraTextGrid}>
                    <Box sx={styles.flexCenter}>
                      <Typography sx={{ mr: 1 }}>Jira URL:</Typography>
                      <Typography variant="h5" sx={styles.jiraShortText}>
                        {jiraObj?.url || "не указан"}
                      </Typography>
                    </Box>
                    {jiraObj?.url && (
                      <IconButton
                        aria-label="copy"
                        onClick={() => onCopy(jiraObj?.url)}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    )}
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export const getServerSideProps = getServerSidePropsWithUserUUID;

export default Me;
