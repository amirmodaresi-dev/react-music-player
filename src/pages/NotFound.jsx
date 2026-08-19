import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="page not-found-page">
      <h1>404</h1>
      <h2>{t('notFound.title')}</h2>
      <p>{t('notFound.text')}</p>
      <Link to="/" className="btn btn-primary">
        {t('common.backHome')}
      </Link>
    </div>
  );
}

export default NotFound;
