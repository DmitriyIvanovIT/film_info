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
  popularity: number,
  media_type: 'movie' | 'tv',
}

export interface IVideoResult {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

type dataResponse = ITrendingResult[] | IVideoResult[];

const getData = (url: string, page?: number, query?: string): Promise<dataResponse> => {
  return axios.get('', {
    baseURL: `${BASE_URL}${url}?api_key=${API_KEY}&language=ru-RU${page ? `&page=${page}` : ''}${query ? `&query=${query}` : ''}`
  })
    .then((res: AxiosResponse) => res.data.results)
    .catch((err: AxiosError) => Promise.reject(err.response))
};

export const getTrends  = async (
  type: 'all' | 'movie' | 'tv' | 'person' | undefined = 'all',
  page: number | undefined = 1,
  period: 'day' | 'week' | undefined = "week"
): Promise<ITrendingResult[]> =>
  await getData(`trending/${type}/${period}`, page) as ITrendingResult[];

export const getPopular = async (
  type: 'movie' | 'tv',
  page: number | undefined = 1,
): Promise<ITrendingResult[]> =>
  await getData(`${type}/popular`, page) as ITrendingResult[];

export const getTop = async (
  type: 'movie' | 'tv',
  page: number | undefined = 1,
): Promise<ITrendingResult[]> =>
  await getData(`${type}/top_rated`, page) as ITrendingResult[];

export const getVideo = async (
  type: 'movie' | 'tv' | undefined,
  videoID: number
): Promise<IVideoResult[]> =>
  await getData(`${type}/${videoID}/videos`) as IVideoResult[];

export const searchData = async (query: string): Promise<ITrendingResult[]> =>
  await getData('search/multi', 1, query) as ITrendingResult[];
