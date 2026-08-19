import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useFavorites } from "../context/FavoritesContext.jsx";
import Loading from "../components/Loading.jsx";

function SongDetails({ onPlay }) {
  const { id } = useParams();
  const { t } = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const getSong = async () => {
      setLoading(true);
      setError(false);
      setNotFound(false);
      setSong(null);

      try {
        const response = await axios.get("http://localhost:3001/songs/" + id);
        setSong(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        } else {
          setError(true);
        }
        setLoading(false);
      }
    };

    getSong();
  }, [id]);

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

  if (notFound || !song) {
    return (
      <div className="page">
        <p className="error-text">{t("songDetails.notFound")}</p>
        <Link to="/songs" className="btn btn-secondary">
          {t("common.backHome")}
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(song.id);

  let favoriteButtonText = t("common.addFavorite");
  if (favorite) {
    favoriteButtonText = t("common.removeFavorite");
  }

  function handlePlayClick() {
    onPlay(song);
  }

  function handleFavoriteClick() {
    toggleFavorite(song.id);
  }

  return (
    <div className="page details-page">
      <img src={song.image} alt={song.title} className="details-image" />
      <div className="details-info">
        <h1>{song.title}</h1>
        <p className="details-subtitle">
          {t("common.artist")}: {song.artist}
        </p>
        <p className="details-subtitle">
          {t("common.genre")}: {song.genre}
        </p>
        <p className="details-description">{song.description}</p>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={handlePlayClick}>
            {t("common.play")}
          </button>
          <button className="btn btn-secondary" onClick={handleFavoriteClick}>
            {favoriteButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SongDetails;
