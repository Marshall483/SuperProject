import axios from "axios";
import { getCookie, removeCookies, setCookies } from "cookies-next";
import { GetServerSidePropsContext } from "next";

const AUTH_TOKEN_NAME = "secret";

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_ROOT,
});

const setAuthToken = (token: string) => {
  setCookies(AUTH_TOKEN_NAME, token);
};

const removeAuthToken = () => removeCookies(AUTH_TOKEN_NAME);

const getAuthToken = (ctx?: GetServerSidePropsContext) => ctx ? getCookie(AUTH_TOKEN_NAME, ctx) : getCookie(AUTH_TOKEN_NAME);

export { authApi, setAuthToken, removeAuthToken, getAuthToken };
