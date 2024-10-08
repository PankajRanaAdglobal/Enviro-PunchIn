//Testing Develop URL
// export const BASE_URL = 'https://enviroapiuat.aglprojects.co.in/';
// export const BASE_URL =
// 'http://latest-dev-be-1210826130.ap-south-1.elb.amazonaws.com/'; //Development
//UAT URL
// export const BASE_URL = 'https://enviroapiuat.aglprojects.co.in/'
// export const BASE_URL = 'https://sdplapi.aglprojects.co.in/'
// export const BASE_URL = 'http://enviro-qa-be-1684424449.ap-south-1.elb.amazonaws.com/'; //QA
// export const BASE_URL = 'https://qaenviroapi.aglprojects.co.in/'; //QA
export const BASE_URL = 'https://devenviroapi.aglprojects.co.in/'; //QA
export const BASE_PATH_VERSION = 'api/';
export const BASE_PATH_URL = BASE_URL + BASE_PATH_VERSION;

export const LOGIN = BASE_PATH_URL + 'guard/auth/guard-qr-signin';
export const VISITOR_TYPE =
  BASE_PATH_URL + 'guard/master/visitor-types-purpose';
export const PUNCH_IN = BASE_PATH_URL + 'guard/safeguard/punchIn';
export const GAURD_PUNCH_IN = BASE_PATH_URL + 'guard/safeguard/guard_login';
export const OTP_VERIFY = BASE_PATH_URL + 'guard/safeguard/otpVarify';
export const DETAILS = BASE_PATH_URL + 'guard/safeguard/details';
export const APPOINTMENT = BASE_PATH_URL + 'guard/auth/directory-searching1';
export const REGENERATE_ACCESS_TOKEN =
  BASE_PATH_URL + 'guard/auth/regenerate-jwt-access-token';
export const GUARD_PUNCH_In_OUT =
  BASE_PATH_URL + 'guard/safeguard/punchinandout';
export const GUARD_CHECKOUT = BASE_PATH_URL + 'guard/safeguard/checkout';
// export const ALL_EMP_LIST = BASE_PATH_URL + 'guard/safeguard/empList';
export const ALL_VISITORS_LIST = BASE_PATH_URL + 'guard/safeguard/visitor-list';
export const GET_QR_CODE = BASE_PATH_URL + 'guard/safeguard/qrcode';

///

export const GET_VIP_GUESTS = BASE_PATH_URL + 'guard/vipguest/list-vip-guest';
export const GET_VIP_CHECK_In_OUT =
  BASE_PATH_URL + 'guard/vipguest/vip-guest-punchinout';
