import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import SongCard from "../components/SongCard.jsx";
import Loading from "../components/Loading.jsx";

function ArtistDetails({ onPlay }) {
  const { id } = useParams();
  const { t } = useTranslation();

  const [artist, setArtist] = useState(null);
  const [artistSongs, setArtistSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const getArtist = async () => {
      setLoading(true);
      setError(false);
      setNotFound(false);
      setArtist(null);
      setArtistSongs([]);

      try {
        const [artistResponse, songsResponse] = await Promise.all([
          axios.get("http://localhost:3001/artists/" + id),
          axios.get("http://localhost:3001/songs?artistId=" + id),
        ]);

        setArtist(artistResponse.data);
        setArtistSongs(songsResponse.data);
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

    getArtist();
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

  if (notFound || !artist) {
    return (
      <div className="page">
        <p className="error-text">{t("artistDetails.notFound")}</p>
        <Link to="/artists" className="btn btn-secondary">
          {t("common.backHome")}
        </Link>
      </div>
    );
  }

  const albums = artist.albums;

  return (
    <div className="page details-page">
      <img
        src={artist.image}
        alt={artist.name}
        className="details-image round"
      />
      <div className="details-info">
        <h1>{artist.name}</h1>
        <p className="details-subtitle">
          {t("common.genre")}: {artist.genre}
        </p>
        <p className="details-description">{artist.description}</p>

        <h2>{t("artistDetails.albums")}</h2>
        {albums.length === 0 ? (
          <p>{t("artistDetails.noAlbums")}</p>
        ) : (
          <ul className="album-list">
            {albums.map((album) => (
              <li key={album}>{album}</li>
            ))}
          </ul>
        )}
      </div>

      <section className="section full-width">
        <h2>{t("artistDetails.songs")}</h2>
        {artistSongs.length === 0 ? (
          <p>{t("common.noResults")}</p>
        ) : (
          <div className="grid">
            {artistSongs.map((song) => (
              <SongCard key={song.id} song={song} onPlay={onPlay} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ArtistDetails;
