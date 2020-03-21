const baseApi = "https://api.hygie.andremeira.com";

export default {
  // Base User
  me: baseApi       + "/api/me",
  auth: baseApi     + "/oauth/token",
  register: baseApi + "/api/register",
  logout: baseApi   + "/api/logout",

  // User Body
  updateBodyParams: baseApi + "/api/update-body-params",
  updateBodyFatParams: baseApi + "/api/update-body-fat-params",
}
