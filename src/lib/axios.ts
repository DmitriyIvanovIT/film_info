import Axios, { AxiosError, AxiosInstance } from 'axios';
import {API_KEY} from "./configs";

const createAxios = (): AxiosInstance => {
  const instance = Axios.create({
    baseURL: API_KEY,
  });

  return instance;
};

export const axios = createAxios();

export default axios;
