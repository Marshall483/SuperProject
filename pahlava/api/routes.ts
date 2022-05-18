export const userRootRoute = process.env.NEXT_PUBLIC_USER_ROOT;
export const userRegisterRoute = userRootRoute + "/user/register";
export const userLoginRoute = userRootRoute + "/user/login";
export const dataRootRoute = process.env.NEXT_PUBLIC_DATA_ROOT;
export const newUserRegisterRoute = `${dataRootRoute}/Event/NewUserRegistration`;
export const postAllProjectsRoute = `${dataRootRoute}/Projects/AddOrUpdateProject`;
export const getAllProjectsByUserIdRoute = (userId: string) =>
  `${dataRootRoute}/Projects/GetAllProjectsByUserId?UserId=${userId}`;
export const getAllActiveProjectsByUserIdRoute = (userId: string) =>
  `${dataRootRoute}/Projects/GetActiveProjectsByUserId?UserId=${userId}`;
export const getAllSprintsByProjectIdRoute = (projectId: string) =>
  `${dataRootRoute}/Sprint/GetSprintsByProjectID?ProjectId=${projectId}`;
export const getReportBySprintIdRoute = (sprintId: string) =>
  `${dataRootRoute}/Report/GetReportBySprintId?sprintId=${sprintId}`;
export const getTasksBySprintIdRoute = (sprintId: string) =>
  `${dataRootRoute}/Task/GetTasksBySprintID?SprintId=${sprintId}`;
