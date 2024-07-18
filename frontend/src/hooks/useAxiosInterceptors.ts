import { useEffect } from 'react';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axiosInstance from '@services/axiosInstance';
import { getAccessToken } from '@utils/tokenStore';
import useRefresh from './useRefresh';
import useRedirect from './useRedirect';
import { ErrorResponse } from '@types';

const useAxiosInterceptors = () => {
  const redirectToSignIn = useRedirect();
  const { mutateAsync: refreshAccessToken } = useRefresh();

  useEffect(() => {
    axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const accessToken = getAccessToken();

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ErrorResponse>) => {
        const originalRequest: InternalAxiosRequestConfig | undefined =
          error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data.name === 'TokenExpiredError' &&
          originalRequest
        ) {
          try {
            await refreshAccessToken();

            const newAccessToken = getAccessToken();
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return axiosInstance.request(originalRequest);
          } catch (refreshError) {
            redirectToSignIn();

            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }, []);
};

export default useAxiosInterceptors;
