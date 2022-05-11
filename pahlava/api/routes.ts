export const userRootRoute = process.env.NEXT_PUBLIC_USER_ROOT;
export const userRegisterRoute = userRootRoute + "/user/register";
export const userLoginRoute = userRootRoute + "/user/login";
export const dataRootRoute = process.env.NEXT_PUBLIC_DATA_ROOT;
export const newUserRegisterRoute =
  dataRootRoute + "/api/Event/NewUserRegistration";
export const GetAllProjectsByUserIdRoute = (userId: string) =>
  dataRootRoute + `/api/Projects/GetAllProjectsByUserId?UserId=${userId}`;
export const postAllProjectsRoute =
  dataRootRoute + `/api/Projects/AddOrUpdateProject`;
export const getReportBySprintIdRoute = (sprintId: string) =>
  dataRootRoute + `/api/Report/GetReportBySprintId?sprintId=${sprintId}`;
export const getTasksBySprintIdRoute = (sprintId: string) =>
  dataRootRoute + `/api/Task/GetTasksBySprintID?SprintId=${sprintId}`;
