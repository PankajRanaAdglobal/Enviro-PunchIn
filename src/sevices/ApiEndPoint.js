export const BASE_URL = 'https://enviroapi.aglprojects.co.in/';
export const BASE_PATH_VERSION = 'api/v1/';
export const BASE_PATH_URL = BASE_URL + BASE_PATH_VERSION;

export const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
export const LOGIN = BASE_PATH_URL + 'auth/qr-signin';
export const VISITOR_TYPE = BASE_PATH_URL + 'master/visitor-types-purpose';
export const PUNCH_IN = BASE_PATH_URL + 'gaurd/punchIn';
export const OTP_VERIFY = BASE_PATH_URL + 'gaurd/otpVarify';
export const DETAILS = BASE_PATH_URL + 'gaurd/details';
export const APPOINTMENT = BASE_PATH_URL + 'auth/directory-searching';
export const REGENERATE_ACCESS_TOKEN =
  BASE_PATH_URL + 'auth/regenerate-jwt-access-token';
export const GUARD_PUNCHOUT = BASE_PATH_URL + 'gaurd/punchinandout';
export const ALL_EMP_LIST = BASE_PATH_URL + 'gaurd/empList';
