import { AxiosError } from 'axios';
import axiosInstance from './axiosInstance';
import { RequestParams } from '@types';

const executeRequest = async ({
  url,
  method,
  params,
  body,
  headers,
}: RequestParams) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      params: params || {},
      data: body || {},
      headers: headers || {},
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};

export { executeRequest };
