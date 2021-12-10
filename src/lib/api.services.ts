// https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>

import axios from "./axios";
import { API_KEY, BASE_URL } from "./configs";
import {AxiosError, AxiosResponse} from "axios";

export interface ITrendingResult {
  adult?: boolean,
  backdrop_path?: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_name?: string,
  original_title?: string,
  overview: string,
  poster_path?: string,
  release_date: string,
  name?: string,
  title?: string,
  video?: boolean,
  vote_average: number,
  vote_count: number,
  popularity: number
}

type dataResponse = ITrendingResult[];

const getData = (url: string, page: number): Promise<dataResponse> => {
  return axios.get('', {
    baseURL: `${BASE_URL}${url}?api_key=${API_KEY}&language=ru-RU&page=${page}`
  })
    .then((res: AxiosResponse) => res.data.results)
    .catch((err: AxiosError) => Promise.reject(err.response))
};

export const getTrends  = async (
  type: 'all' | 'movie' | 'tv' | 'person' | undefined = 'all',
  page: number | undefined = 1,
  period: 'day' | 'week' | undefined = "week"
): Promise<ITrendingResult[]> =>  await getData(`trending/${type}/${period}`, page);

export const getPopular = async (
  type: 'movie' | 'tv',
  page: number | undefined = 1,
): Promise<ITrendingResult[]> => await getData(`${type}/popular`, page);

export const getTop = async (
  type: 'movie' | 'tv',
  page: number | undefined = 1,
): Promise<ITrendingResult[]> => await getData(`${type}/top_rated`, page);
