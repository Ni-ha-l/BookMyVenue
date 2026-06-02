import axios, { AxiosRequestConfig } from 'axios';
import { logger } from './logger';

export const httpGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const res = await axios.get<T>(url, config);
    return res.data;
  } catch (err) {
    logger.error('HTTP GET failed', { url, error: (err as Error).message });
    throw err;
  }
};

export const httpPut = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const res = await axios.put<T>(url, data, config);
    return res.data;
  } catch (err) {
    logger.error('HTTP PUT failed', { url, error: (err as Error).message });
    throw err;
  }
};

export const httpPost = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const res = await axios.post<T>(url, data, config);
    return res.data;
  } catch (err) {
    logger.error('HTTP POST failed', { url, error: (err as Error).message });
    throw err;
  }
};
