import { useTranslation } from 'react-i18next';

function Loading() {
  const { t } = useTranslation();

  return (
    <div className="loading-wrapper">
      <div className="spinner"></div>
      <p>{t('common.loading')}</p>
    </div>
  );
}

export default Loading;
