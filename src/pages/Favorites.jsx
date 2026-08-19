import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext.jsx";
import SongCard from "../components/SongCard.jsx";
import Loading from "../components/Loading.jsx";

function Favorites({ onPlay }) {
  const { t } = useTranslation();
  const { favoriteIds } = useFavorites();
  const [songs, setSongs] = useState([]);
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

  const favoriteSongs = songs.filter(function (song) {
    return favoriteIds.includes(song.id);
  });

  return (
    <div className="page">
      <h1>{t("favorites.title")}</h1>

      {favoriteSongs.length === 0 ? (
        <p>{t("favorites.empty")}</p>
      ) : (
        <div className="grid">
          {favoriteSongs.map((song) => (
            <SongCard key={song.id} song={song} onPlay={onPlay} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
