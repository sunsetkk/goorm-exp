import React from 'react';
import { Outlet, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import DetailPage from "./pages/DetailPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import SeriesPage from "./pages/SeriesPage";
import MoviesPage from "./pages/MoviesPage";


const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />

      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <Routes> 
        <Route path="/" element={<Layout />} >
        <Route index element={<MainPage />} />
        <Route path=":movieId" element={<DetailPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="series" element={<SeriesPage />} />
        <Route path="movies" element={<MoviesPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
