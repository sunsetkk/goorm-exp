import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import requests from "../../api/requests";
import "./MoviesPage.css";

const genres = [
  { key: "fetchActionMovies", label: "액션" },
  { key: "fetchComedyMovies", label: "코미디" },
  { key: "fetchHorrorMovies", label: "공포" },
  { key: "fetchRomanceMovies", label: "로맨스" },
  { key: "fetchDocumentaries", label: "다큐멘터리" },
];

const sortOptions = [
  { value: "popularity.desc", label: "인기순" },
  { value: "release_date.desc", label: "최신순" },
  { value: "vote_average.desc", label: "평점순" },
];

export default function MoviesPage() {
  const [selectedGenre, setSelectedGenre] = useState("fetchRomanceMovies");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const baseUrl = requests[selectedGenre];
        const response = await axios.get(baseUrl, {
          params: { sort_by: sortBy },
        });
        setMovies(response.data.results || []);
      } catch (err) {
        console.error("영화 불러오기 실패:", err);
        setMovies([]);
      }
    };
    document.title = "movie | Netflix Clone";
    fetchMovies();
  }, [selectedGenre, sortBy]);

  return (
    <div className="moviesContainer">
      <div className="moviesHeader">
        <h2><span role="img" aria-label="movie">🎬</span> Movie </h2>
        <div className="filters">
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            {genres.map((g) => (
              <option key={g.key} value={g.key}>{g.label}</option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="movieGrid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movieItem">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))
        ) : (
          <p style={{ color: "#aaa" }}>영화를 찾을 수 없습니다.</p>
        )}
      </div>
    </div>
  );
}
