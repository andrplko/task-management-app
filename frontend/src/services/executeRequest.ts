import axios, { Method, AxiosHeaders, AxiosError } from 'axios';

interface RequestParams {
  url: string;
  method: Method | string;
  params?: unknown;
  body?: unknown;
  headers?: AxiosHeaders | null;
}

const executeRequest = async ({
  url,
  method,
  params,
  body,
  headers,
}: RequestParams) => {
  try {
    const response = await axios({
      url,
      method,
      params: params || {},
      data: body || {},
      headers: headers || {},
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    }

    throw error;
  }
};

export { executeRequest };
