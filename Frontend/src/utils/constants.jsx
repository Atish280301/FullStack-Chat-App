//frontend/src/utils/constants.jsx
// export const HOST = import.meta.env.VITE_SERVER_URL;
export const HOST = "http://localhost:8081";
export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/userinfo`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/updateprofile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/addprofileimage`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/removeprofileimage`;
export const LOGOUT_PROFILE_ROUTE = `${AUTH_ROUTES}/logout`;

export const CONTACTS_ROUTES = "api/contacts";
export const SEARCH_CONTACTS_ROUTE = `${CONTACTS_ROUTES}/search`;
export const GET_DM_CONTACTS_LIST_ROUTE = `${CONTACTS_ROUTES}/getcontactsdm`;
export const GET_ALL_CONTACTS_ROUTE = `${CONTACTS_ROUTES}/getallcontacts`;

export const MESSAGES_ROUTES = "api/messages";
export const GET_ALL_MESSAGES_ROUTE = `${MESSAGES_ROUTES}/getmessages`;
export const UPLOAD_FILE_ROUTE = `${MESSAGES_ROUTES}/uploadfile`;

export const CHANNEL_ROUTES = "api/channels";
export const CREATE_CHANNEL_ROUTE = `${CHANNEL_ROUTES}/createchannel`;
export const GET_USER_CHANNEL_ROUTE = `${CHANNEL_ROUTES}/getuserchannels`;
export const GET_CHANNEL_MESSAGES_ROUTE = `${CHANNEL_ROUTES}/getchannelmessages`
