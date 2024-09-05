import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {REGENERATE_ACCESS_TOKEN} from '../../src/sevices/ApiEndPoint';
import {useNavigation} from '@react-navigation/native';
import {logoutSuccess} from '../redux/slices/VisitorSlice';

import {setAccessToken} from '../redux/slices/TokenSlice';

const useApiEffect = () => {
  const dispatch = useDispatch();
  // const accessToken = useSelector(state => state?.authToken?.accessToken);
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9jb2RlIjoiQUdMMzE0NSIsInVzZXJJZCI6MzEzMywiRGJjYWxsIjoiYWdsIiwiaWF0IjoxNzA0ODY4ODM0LCJleHAiOjE3MDQ4OTc2MzR9.tq5Zylqo7SWN5lJjeMxLcxPFIPqCg9tKo3fjAegrW9E';
  const refreshToken = useSelector(state => state?.authToken?.refreshToken);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const companyid = useSelector(
    state => state?.auth?.loginUser?.data?.guard?.company_id,
  );
  // const companyid1 = useSelector(
  //   state => state?.auth?.loginUser?.data?.guard?.company_id,
  // );
  // console.log("1companyID----->", companyid);

  let headersMultipart = null;

  const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    dbtoken:
      companyid === null || companyid == undefined || companyid == ''
        ? 'agl'
        : companyid,
  };

  // API CALL
  async function apiCall({
    url: url,
    method: method,
    isToken: isToken,
    data: data = {},
    maxRetries: maxRetries = 3,
    isImageUpload: isImageUpload,
    dbToken: dbToken,
  }) {
    if (isImageUpload) {
      headersMultipart = {
        Authorization: accessToken,
        Accept: '*/*',
        dbtoken: dbToken,
      };
    }

    const body =
      method != 'GET' && isImageUpload
        ? data
        : method == 'GET'
        ? null
        : JSON.stringify(data);

    // PASS QRCODE TOKEN WHEN SCANING OFFICE QRCODE
    const headersWithToken = {
      Authorization: `JWT ${accessToken}`,
      'Content-Type': 'application/json',
      dbtoken: dbToken,
    };

    console.log('API PARAMS: ', {
      Url: url,
      Method: method,
      isToken: isToken,
      Data: body,
      Condition: isToken
        ? headersWithToken
        : isImageUpload
        ? headersMultipart
        : '',
    });

    try {
      const response = await fetch(url, {
        method: method,
        headers: isToken
          ? headersWithToken
          : isImageUpload
          ? headersMultipart
          : HEADERS,
        body: body,
      });

      // WORKED IF ACCESS TOKEN EXPIRED
      //console.log('response?.status =>', response?.status, response?.body);
      if (response?.status === 401 && maxRetries > 0) {
        //Handle token expiration here, possibly by refreshing the token
        try {
          // Dispatch the new token to Redux
          // Retry the original request with the new access token
          const retryResponse = await fetch(REGENERATE_ACCESS_TOKEN, {
            method: 'POST',
            headers: {
              Host: '13.127.230.193:3000',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({jwtRefreshToken: refreshToken}),
          });
          const apiData = await retryResponse.json();
          if (apiData?.data) {
            dispatch(setAccessToken(`JWT ${apiData?.data}`));
            // IF ACCESS TOKEN GENERATE SUCCESSFULLY MAKE API CALL AGAIN WITH MAX RETRIES 3 TIMES
            return apiCall(url, method, isToken, data, maxRetries - 1);
          } else {
            setLoading(false);
            ///Navigate to Login
            return;
          }
        } catch (refreshError) {
          console.log('Refresh Token Error: ', refreshError);
        }
      }
      setLoading(false);
      return await response.json();
    } catch (error) {
      console.log('API ERROR: ', error?.message);
    }
  }

  async function uploadImageWithData(url, formData, dbtoken = 'agl') {
    try {
      const response = await apiCall(
        url,
        'POST',
        false,
        formData,
        1,
        true,
        dbtoken,
      );
      return response;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  }

  const makeApiRequest = async ({
    url: url,
    method: method = 'GET',
    isToken: isToken = false,
    data: data = {},
    showProgress: showProgress = true,
    isImageUpload: isImageUpload = false,
    dbToken = 'agl',
  }) => {
    showProgress && setLoading(true);
    try {
      if (isImageUpload) {
        const response = await uploadImageWithData({
          url: url,
          data: data,
          dbToken: dbToken,
          method: method,
          isImageUpload: isImageUpload,
          isToken: isToken,
        });
        return await response;
      } else {
        const response = await apiCall({url, method, isToken, data, dbToken});
        return await response;
      }
    } catch (error) {
      console.log(error);
    } finally {
      showProgress && setLoading(false);
    }
  };
  return {makeApiRequest, loading};
};

export default useApiEffect;
