import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ArtistCard from "../components/ArtistCard.jsx";
import Loading from "../components/Loading.jsx";

function Artists() {
  const { t } = useTranslation();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getArtists = async () => {
      try {
        const response = await axios.get("http://localhost:3001/artists");
        setArtists(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    getArtists();
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

  return (
    <div className="page">
      <h1>{t("nav.artists")}</h1>

      {artists.length === 0 ? (
        <p>{t("common.noResults")}</p>
      ) : (
        <div className="grid">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Artists;
