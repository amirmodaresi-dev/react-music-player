import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import SongCard from "../components/SongCard.jsx";
import ArtistCard from "../components/ArtistCard.jsx";
import Loading from "../components/Loading.jsx";

function Home({ onPlay }) {
  const { t } = useTranslation();
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const [songsResponse, artistsResponse] = await Promise.all([
          axios.get("http://localhost:3001/songs"),
          axios.get("http://localhost:3001/artists"),
        ]);

        setSongs(songsResponse.data);
        setArtists(artistsResponse.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div className="page home-page">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page home-page">
        <p className="error-text">{t("common.error")}</p>
      </div>
    );
  }

  const popularSongs = songs.slice(0, 4);
  const popularArtists = artists.slice(0, 4);

  const genreList = [...new Set(songs.map((song) => song.genre))];

  return (
    <div className="page home-page">
      <section className="hero">
        <h1>{t("home.title")}</h1>
        <p>{t("home.subtitle")}</p>
        <Link to="/songs" className="btn btn-primary btn-lg">
          {t("home.browseSongs")}
        </Link>
      </section>

      <section className="section">
        <h2>{t("home.popularSongs")}</h2>
        {popularSongs.length === 0 ? (
          <p>{t("common.noResults")}</p>
        ) : (
          <div className="grid">
            {popularSongs.map((song) => (
              <SongCard key={song.id} song={song} onPlay={onPlay} />
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <h2>{t("home.popularArtists")}</h2>
        {popularArtists.length === 0 ? (
          <p>{t("common.noResults")}</p>
        ) : (
          <div className="grid">
            {popularArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <h2>{t("home.genres")}</h2>
        <div className="genre-list">
          {genreList.map((genre) => (
            <span key={genre} className="genre-pill">
              {genre}
            </span>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} {t("app.name")} - {t("footer.text")}
        </p>
      </footer>
    </div>
  );
}

export default Home;
