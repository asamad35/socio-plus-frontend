console.log(import.meta.env.PROD, "ooooooooooooooooo");

export const BASE_URL =
  import.meta.env.PROD === false
    ? "http://localhost:5000/api/v1/"
    : "https://socio-backend-gvab.onrender.com/api/v1/";

export const SOCKET_CONNECTION_URL =
  import.meta.env.PROD === false
    ? "http://localhost:5000"
    : "https://socio-backend-gvab.onrender.com";

export const API_URLS = {
  postSignup: "signup",
  postLogin: "login",
  postLoginWithGoogleDB: "login-with-google",
  postUpdateStatus: "update-status",
  postUpdateName: "update-name",
  postUpdatePhoto: "update-photo",
  getSearchUsers: "search-users",
  getChatList: "chat/get-chat-list",
  getAllMessages: "message/fetch-all-messages",
  postSendMessage: "message/send-message",
  postAccessChat: "chat/access-chat",
  postLogoutWithGoogle: "/google-logout",
};

export const googleUserInfoData =
  "https://www.googleapis.com/oauth2/v3/userinfo";
