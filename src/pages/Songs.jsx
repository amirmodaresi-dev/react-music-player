import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import SongCard from "../components/SongCard.jsx";
import Loading from "../components/Loading.jsx";

function Songs({ onPlay }) {
  const { t } = useTranslation();
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/songs");
        setSongs(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    getSongs();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <p className="error-text">{t("common.error")}</p>
      </div>
    );
  }

  // Simple search filter by song title or artist name
  const searchText = search.toLowerCase();
  const filteredSongs = songs.filter(function (song) {
    const title = song.title.toLowerCase();
    const artistName = song.artist.toLowerCase();
    if (title.includes(searchText) || artistName.includes(searchText)) {
      return true;
    }
    return false;
  });

  return (
    <div className="page">
      <h1>{t("nav.songs")}</h1>

      <input
        type="text"
        className="search-input"
        placeholder={t("common.search")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredSongs.length === 0 ? (
        <p>{t("common.noResults")}</p>
      ) : (
        <div className="grid">
          {filteredSongs.map((song) => (
            <SongCard key={song.id} song={song} onPlay={onPlay} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Songs;
