import { GetServerSidePropsContext } from "next";
import { getAuthToken } from "../api/cookieStorage";

export const getServerSidePropsWithUserUUID = (
  ctx: GetServerSidePropsContext
) => {
  const token = getAuthToken(ctx);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
  const { uuid } = JSON.parse(token) as { uuid: string };
  return {
    props: {
      uuid,
    },
  };
};
