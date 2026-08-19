import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFavorites } from "../context/FavoritesContext.jsx";

function SongCard({ song, onPlay, currentSong, isPlaying, onPlayPause }) {
  const { t } = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(song.id);
  const isCurrentSong = currentSong && currentSong.id === song.id;

  function handleFavoriteClick(e) {
    e.stopPropagation();
    toggleFavorite(song.id);
  }

  function handlePlayClick(e) {
    e.stopPropagation();
    if (isCurrentSong) {
      onPlayPause();
    } else {
      onPlay(song);
    }
  }

  let favoriteButtonText = favorite
    ? t("common.removeFavorite")
    : t("common.addFavorite");
  let favoriteIcon = favorite ? "♥" : "♡";

  return (
    <div className="card song-card">
      <Link to={`/songs/${song.id}`}>
        <img src={song.image} alt={song.title} className="card-image" />
      </Link>
      <div className="card-body">
        <h3 className="card-title">{song.title}</h3>
        <p className="card-subtitle">{song.artist}</p>
        <span className="badge">{song.genre}</span>
        <div className="card-actions">
          <Link to={`/songs/${song.id}`} className="btn btn-secondary">
            {t("common.viewDetails")}
          </Link>
          <button className="btn btn-primary" onClick={handlePlayClick}>
            {isCurrentSong && isPlaying ? t("common.pause") : t("common.play")}
          </button>
          <button
            className={`btn-icon ${favorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
            title={favoriteButtonText}
          >
            {favoriteIcon}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SongCard;
