import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoGames from "./pages/VideoGames/VideoGames";
import Movies from "./pages/Movies/Movies";
import { Container, Typography } from "@mui/material";
import Home from "./pages/Home";

export default function App() {
  return (
    <Container>
      <Typography align="center" variant="h2" component="div" gutterBottom>
        Platos Assignment
      </Typography>
      <hr />
      <Router>
        <Routes>
          <Route path="video-games" element={<VideoGames />} />
          <Route path="movies" element={<Movies />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Container>
  );
}
