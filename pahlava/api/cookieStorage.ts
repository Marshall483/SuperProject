import { getCookie, removeCookies, setCookies } from "cookies-next";
import { GetServerSidePropsContext } from "next";

const AUTH_TOKEN_NAME = "secret";

const setAuthToken = (token: string) => {
  setCookies(AUTH_TOKEN_NAME, token);
};

const removeAuthToken = () => removeCookies(AUTH_TOKEN_NAME);

const getAuthToken = (ctx?: GetServerSidePropsContext) =>
  ctx
    ? String(getCookie(AUTH_TOKEN_NAME, ctx))
    : String(getCookie(AUTH_TOKEN_NAME));

export { setAuthToken, removeAuthToken, getAuthToken };
