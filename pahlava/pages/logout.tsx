import { removeAuthToken } from "../api/cookieStorage";

const Logout = () => <></>;

export const getServerSideProps = () => {
  removeAuthToken();
  return {
    redirect: {
      permanent: false,
      destination: `/`,
    },
  };
};

export default Logout;
