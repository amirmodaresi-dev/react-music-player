import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ArtistCard({ artist }) {
  const { t } = useTranslation();

  return (
    <Link to={`/artists/${artist.id}`} className="card artist-card">
      <img src={artist.image} alt={artist.name} className="card-image round" />
      <div className="card-body">
        <h3 className="card-title">{artist.name}</h3>
        <span className="badge">{artist.genre}</span>
        <p className="card-link-text">{t('common.viewDetails')}</p>
      </div>
    </Link>
  );
}

export default ArtistCard;
