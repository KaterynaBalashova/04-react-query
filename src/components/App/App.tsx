import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import { fetchMovies } from '../../services/movieService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';


export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (newTopic: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false)
      const newMovies = await fetchMovies(newTopic);

      if (newMovies.length === 0) {
        toast.error("No movies found for your request.")
      }
      setMovies(newMovies);
    }catch {
      setIsError(true);
  } finally {
      setIsLoading(false);
    }
    
  } 

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (<MovieGrid movies={movies} onSelect={(movie) => setSelectedMovie(movie)} />)}
      {selectedMovie && (<MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />)}
    </>
  );
}


