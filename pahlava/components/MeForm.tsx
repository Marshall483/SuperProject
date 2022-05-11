import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { setJiraTokens } from "../api/cookieStorage";
import { meJiraSchema } from "../utils/validationSchemas";

interface Props {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading?: boolean;
}

const MeForm = ({ setIsLoading, isLoading }: Props) => {
  const formik = useFormik({
    initialValues: {
      token: "",
      url: "",
    },
    validationSchema: meJiraSchema,
    onSubmit: async ({ token, url }, { resetForm }) => {
      setIsLoading(true);
      await new Promise((res) => setTimeout(res, 3000)).then(() =>
        setJiraTokens(token, url)
      );
      setIsLoading(false);
      toast.success("Данные успешно обновлены");
      resetForm()
    },
  });
  return (
    <Paper
      sx={{
        maxWidth: 400,
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        py: 2,
        px: 4,
      }}
    >
      <Typography variant="h5">
        Обязательные поля для использования сервиса
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <Grid
          sx={{
            display: "grid",
            alignItems: "center",
            gridRowGap: 10,
            mt: 3,
          }}
          spacing={5}
        >
          <Grid>
            <Typography sx={{ mb: 1 }}>Token Jira:</Typography>
            <TextField
              autoComplete="none"
              name="token"
              variant="outlined"
              error={Boolean(formik.touched.token && formik.errors.token)}
              helperText={formik.touched.token && formik.errors.token}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.token}
            />
          </Grid>
          <Grid>
            <Typography sx={{ mb: 1 }}>Jira URL:</Typography>
            <TextField
              autoComplete="none"
              name="url"
              variant="outlined"
              error={Boolean(formik.touched.url && formik.errors.url)}
              helperText={formik.touched.url && formik.errors.url}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.url}
            />
          </Grid>
          <Button
            disabled={isLoading || formik.isSubmitting}
            type="submit"
            sx={{ mt: 3, width: 150 }}
            variant="outlined"
            color="success"
          >
            Сохранить
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default MeForm;
