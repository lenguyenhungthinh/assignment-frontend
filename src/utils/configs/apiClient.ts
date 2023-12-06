import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';

import {
  CommonServerError,
  ErrorResponse,
  MaintenanceServerError,
  NetworkError,
  RequestAbortedError,
  ServerTimeoutError,
  SessionTimeOutError,
} from './apiErrors';
import { envVariables } from './envVariables';

import { statusCodes } from '@/utils/enums/statusCode';

export interface AxiosRequestConfigExt extends AxiosRequestConfig {
  isRetryRequest: boolean | undefined;
}

// Got an error response from the server
function handleResponseError(response: AxiosResponse<ErrorResponse>) {
  if (response.status === statusCodes.UNAUTHORIZED) {
    throw new SessionTimeOutError();
  }

  if (response.status === statusCodes.MAINTENANCE) {
    throw new MaintenanceServerError();
  }

  if (response.status === statusCodes.SERVER_TIMEOUT) {
    throw new ServerTimeoutError();
  }

  throw new CommonServerError(response.data);
}

function handleAxiosError(error: AxiosError<ErrorResponse>) {
  if (error.response) {
    return handleResponseError(error.response);
  }

  return handleCommonServerError(error);
}

// Unexpected error happened
function handleCommonServerError(error: AxiosError<ErrorResponse>) {
  throw new CommonServerError({
    code: error.code,
    name: error.name,
    message: error.message,
  });
}

export interface RequestOptions {
  isHandleError?: boolean;
  baseURL?: string;
  isPublic?: boolean;
  isSigned?: boolean;
}

export class Request {
  public readonly axiosClient: AxiosInstance;
  private readonly isHandleError: boolean;
  private readonly isSigned: boolean;

  constructor(
    { isHandleError = false, baseURL, isSigned = false }: RequestOptions = {
      isHandleError: false,
      isPublic: false,
      isSigned: false,
    },
  ) {
    this.isHandleError = isHandleError;
    this.axiosClient = axios.create({
      baseURL: baseURL,
      timeout: 600000,
    });

    this.isSigned = isSigned;

    this.axiosClient.interceptors.request.use((config) => {
      return config;
    });

    this.axiosClient.interceptors.response.use((response) => {
      const reqUrl = response.config.url;

      if (!response.request.responseURL.includes(reqUrl)) {
        location.href = '/login';
      }

      return response;
    });
  }

  handleError<T = never>(error: AxiosError<ErrorResponse>): Promise<AxiosResponse<T>> {
    if (!this.isHandleError) {
      throw error;
    }

    if (error.code === 'ECONNABORTED') {
      if (error.message === 'Request aborted') {
        throw new RequestAbortedError();
      }
      throw new ServerTimeoutError();
    }

    // Request aborted error on Safari
    if (error.code === 'ERR_NETWORK' && error.message === 'Network Error') {
      throw new NetworkError();
    }

    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      handleCommonServerError(error);
    }

    /* Since typescript doesn't have Throwable type (yet) so we need to add this but
     * this code is unreachable as the error has already been thrown up there.
     */
    return Promise.resolve(undefined as unknown as AxiosResponse<T>);
  }

  async get<T = never>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    if (this.isSigned) {
      config.headers = {
        ...(config.headers ?? {}),
      } as AxiosRequestHeaders;
    }

    return this.axiosClient.get<T>(url, config).catch((error: AxiosError<ErrorResponse>) => this.handleError<T>(error));
  }

  async post<T = never>(url: string, data?: unknown, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    if (this.isSigned) {
      config.headers = {
        ...(config.headers ?? {}),
      } as AxiosRequestHeaders;
    }

    return this.axiosClient.post<T>(url, data, config).catch((error: AxiosError<ErrorResponse>) => this.handleError(error));
  }

  async put<T = never>(url: string, data?: unknown, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    if (this.isSigned) {
      config.headers = {
        ...(config.headers ?? {}),
      } as AxiosRequestHeaders;
    }

    return this.axiosClient.put<T>(url, data, config).catch((error: AxiosError<ErrorResponse>) => this.handleError(error));
  }

  async patch<T = never>(url: string, data?: unknown, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    if (this.isSigned) {
      config.headers = {
        ...(config.headers ?? {}),
      } as AxiosRequestHeaders;
    }

    return this.axiosClient.patch<T>(url, data, config).catch((error: AxiosError<ErrorResponse>) => this.handleError(error));
  }

  async delete<T = never>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    if (this.isSigned) {
      config.headers = {
        ...(config.headers ?? {}),
      } as AxiosRequestHeaders;
    }

    return this.axiosClient.delete<T>(url, config).catch((error: AxiosError<ErrorResponse>) => this.handleError(error));
  }
}

export const ocpsApiClient = new Request({
  baseURL: envVariables.NEXT_PUBLIC_OCPS_API_ENDPOINT,
  isHandleError: true,
});
