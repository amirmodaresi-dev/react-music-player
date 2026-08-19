import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Navbar from "./components/Navbar.jsx";
import Player from "./components/Player.jsx";
import Home from "./pages/Home.jsx";
import Songs from "./pages/Songs.jsx";
import SongDetails from "./pages/SongDetails.jsx";
import Artists from "./pages/Artists.jsx";
import ArtistDetails from "./pages/ArtistDetails.jsx";
import Favorites from "./pages/Favorites.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  const { i18n } = useTranslation();
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    if (i18n.language === "fa") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
    localStorage.setItem("language", i18n.language);
  }, [i18n.language]);

  // دریافت تمام آهنگ‌ها جهت استفاده در کنترل‌های قبلی / بعدی
  useEffect(() => {
    const getSongs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/songs");
        setAllSongs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSongs();
  }, []);

  function handlePlay(song) {
    setCurrentSong(song);
    setIsPlaying(true);
  }

  function handlePlayPause() {
    setIsPlaying(!isPlaying);
  }

  function handleNext() {
    if (!currentSong || allSongs.length === 0) return;

    const currentIndex = allSongs.findIndex(
      (song) => song.id === currentSong.id,
    );
    const nextIndex = (currentIndex + 1) % allSongs.length;

    setCurrentSong(allSongs[nextIndex]);
    setIsPlaying(true);
  }

  function handlePrevious() {
    if (!currentSong || allSongs.length === 0) return;

    const currentIndex = allSongs.findIndex(
      (song) => song.id === currentSong.id,
    );
    const previousIndex =
      (currentIndex - 1 + allSongs.length) % allSongs.length;

    setCurrentSong(allSongs[previousIndex]);
    setIsPlaying(true);
  }

  const commonProps = {
    onPlay: handlePlay,
    currentSong,
    isPlaying,
    onPlayPause: handlePlayPause,
  };

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home {...commonProps} />} />
          <Route path="/songs" element={<Songs {...commonProps} />} />
          <Route path="/songs/:id" element={<SongDetails {...commonProps} />} />
          <Route path="/artists" element={<Artists />} />
          <Route
            path="/artists/:id"
            element={<ArtistDetails {...commonProps} />}
          />
          <Route path="/favorites" element={<Favorites {...commonProps} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}

export default App;
