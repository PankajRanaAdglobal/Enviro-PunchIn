//Testing Develop URL
// export const BASE_URL = 'https://enviroapi.aglprojects.co.in/';
export const BASE_URL = 'https://devenviroapi.aglprojects.co.in/'; //Development
//UAT URL
// export const BASE_URL = 'https://enviroapiuat.aglprojects.co.in/'
export const BASE_PATH_VERSION = 'api/v1/';
export const BASE_PATH_URL = BASE_URL + BASE_PATH_VERSION;


export const LOGIN = BASE_PATH_URL + 'auth/guard-qr-signin';
export const VISITOR_TYPE = BASE_PATH_URL + 'master/visitor-types-purpose';
export const PUNCH_IN = BASE_PATH_URL + 'gaurd/punchIn';
export const GAURD_PUNCH_IN = BASE_PATH_URL + 'gaurd/guard_login';
export const OTP_VERIFY = BASE_PATH_URL + 'gaurd/otpVarify';
export const DETAILS = BASE_PATH_URL + 'gaurd/details';
export const APPOINTMENT = BASE_PATH_URL + 'auth/directory-searching1';
export const REGENERATE_ACCESS_TOKEN =
  BASE_PATH_URL + 'auth/regenerate-jwt-access-token';
export const GUARD_PUNCH_In_OUT = BASE_PATH_URL + 'gaurd/punchinandout';
export const GUARD_CHECKOUT = BASE_PATH_URL + 'gaurd/checkout';
export const ALL_EMP_LIST = BASE_PATH_URL + 'gaurd/empList';
export const ALL_VISITORS_LIST = BASE_PATH_URL + 'gaurd/visitor-list';
export const GET_QR_CODE = BASE_PATH_URL + "gaurd/qrcode"
