import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./SeriesPage.css";

const genreOptions = [
  { id: "18", name: "드라마" },
  { id: "35", name: "코미디" },
  { id: "10759", name: "액션 & 어드벤처" },
  { id: "10765", name: "SF & 판타지" },
  { id: "99", name: "다큐멘터리" },
];

const sortOptions = [
  { value: "popularity.desc", label: "인기순" },
  { value: "first_air_date.desc", label: "최신순" },
  { value: "vote_average.desc", label: "평점순" },
];

export default function SeriesPage() {
  const [series, setSeries] = useState([]);
  const [genre, setGenre] = useState("18");
  const [sortBy, setSortBy] = useState("popularity.desc");

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get("/discover/tv", {
          params: {
            with_genres: genre,
            sort_by: sortBy,
          },
        });
        setSeries(response.data.results || []);
      } catch (err) {
        console.error("TV 시리즈 불러오기 실패:", err);
        setSeries([]);
      }
    };
    
    document.title = "series | Netflix Clone";

    fetchSeries();
  }, [genre, sortBy]);

  return (
    <div className="seriesContainer">
      <div className="seriesHeader">
        <h2><span role="img" aria-label="tv">📺</span> TV series </h2>
        <div className="filters">
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            {genreOptions.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="seriesGrid">
        {series.length > 0 ? (
          series.map((item) => (
            <div key={item.id} className="seriesItem">
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.name}
              />
              <p>{item.name}</p>
            </div>
          ))
        ) : (
          <p style={{ color: "#aaa" }}>시리즈를 찾을 수 없습니다.</p>
        )}
      </div>
    </div>
  );
}
