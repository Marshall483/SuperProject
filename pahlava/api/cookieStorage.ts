import { getCookie, removeCookies, setCookies } from "cookies-next";
import { GetServerSidePropsContext } from "next";

const AUTH_TOKEN_NAME = "secret";

const setAuthToken = (token: string) => {
  setCookies(AUTH_TOKEN_NAME, token);
};

const removeAuthToken = () => removeCookies(AUTH_TOKEN_NAME);

const getAuthToken = (ctx?: GetServerSidePropsContext) => {
  let cookie;
  if (ctx) {
    cookie = getCookie(AUTH_TOKEN_NAME, ctx);
  } else {
    cookie = getCookie(AUTH_TOKEN_NAME);
  }
  return cookie === undefined ? "" : String(cookie);
};

export { setAuthToken, removeAuthToken, getAuthToken };
