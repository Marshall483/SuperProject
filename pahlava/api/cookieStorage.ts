import { getCookie, removeCookies, setCookies } from "cookies-next";
import { GetServerSidePropsContext } from "next";

enum Tokens {
  AUTH = "adfaerghfsdgajerlkagads",
  JIRA = "adfadrweewqeqwergetwers",
  MYPROJECTS = "asdfawefeaefaesafeadf",
}

const setAuthToken = (token: string) => {
  setCookies(Tokens.AUTH, token);
};

const setJiraTokens = (token: string, url: string) => {
  setCookies(Tokens.JIRA, JSON.stringify({ token, url }));
};

const setMyProjects = (projectStr : string) => {
    setCookies(Tokens.MYPROJECTS, projectStr);
};

const removeAuthToken = () => removeCookies(Tokens.AUTH);
const removeJiraToken = () => removeCookies(Tokens.JIRA);

const getAuthToken = (ctx?: GetServerSidePropsContext): string => {
  return getToken(Tokens.AUTH, ctx);
};

const getJiraToken = (ctx?: GetServerSidePropsContext): string => {
  return getToken(Tokens.JIRA, ctx);
};

const getMyProjects = (ctx?: GetServerSidePropsContext): string => {
    return getToken(Tokens.MYPROJECTS, ctx);
};

const getToken = (tokenName: Tokens, ctx?: GetServerSidePropsContext) => {
  let cookie;
  if (ctx) {
    cookie = getCookie(tokenName, ctx);
  } else {
    cookie = getCookie(tokenName);
  }
  return cookie === undefined ? "" : String(cookie);
};

export {
  setAuthToken,
  removeAuthToken,
  getAuthToken,
  setJiraTokens,
  removeJiraToken,
  getJiraToken,
  getMyProjects,
  setMyProjects
};
