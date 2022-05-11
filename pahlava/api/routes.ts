export const userRootRoute = process.env.NEXT_PUBLIC_USER_ROOT;
export const userRegisterRoute = userRootRoute + "/user/register";
export const userLoginRoute = userRootRoute + "/user/login";
export const dataRootRoute = process.env.NEXT_PUBLIC_DATA_ROOT;
export const newUserRegisterRoute =
  dataRootRoute + "/Event/NewUserRegistration";
export const GetAllProjectsByUserIdRoute = (userId: string) =>
  dataRootRoute + `/Projects/GetAllProjectsByUserId?UserId=${userId}`;
export const postAllProjectsRoute =
  dataRootRoute + `/Projects/AddOrUpdateProject`;
export const getReportBySprintIdRoute = (sprintId: string) =>
  dataRootRoute + `/Report/GetReportBySprintId?sprintId=${sprintId}`;
export const getTasksBySprintIdRoute = (sprintId: string) =>
  dataRootRoute + `/Task/GetTasksBySprintID?SprintId=${sprintId}`;
