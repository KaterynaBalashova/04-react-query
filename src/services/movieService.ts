import axios from 'axios';
import { Movie } from '../types/movie';

const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesHttpResponse {
    results: Movie[];
    total_pages: number;
};

export const fetchMovies = async (topic: string, page?: number) => {
    const response = await axios.get<MoviesHttpResponse>(
        "https://api.themoviedb.org/3/search/movie",
        {
            params: {
                query: topic,
                page,
            },
            headers: {
                Authorization: `Bearer ${myKey}`,
            },
        }
    );
    return response.data;
};