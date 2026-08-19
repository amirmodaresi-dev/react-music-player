import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { t, i18n } = useTranslation();

  function getLinkClass({ isActive }) {
    if (isActive) {
      return 'nav-link active';
    }
    return 'nav-link';
  }

  function changeLanguage() {
    if (i18n.language === 'fa') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('fa');
    }
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        🎵 {t('app.name')}
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" className={getLinkClass} end>
          {t('nav.home')}
        </NavLink>
        <NavLink to="/songs" className={getLinkClass}>
          {t('nav.songs')}
        </NavLink>
        <NavLink to="/artists" className={getLinkClass}>
          {t('nav.artists')}
        </NavLink>
        <NavLink to="/favorites" className={getLinkClass}>
          {t('nav.favorites')}
        </NavLink>
        <NavLink to="/about" className={getLinkClass}>
          {t('nav.about')}
        </NavLink>
      </div>

      <button className="lang-switch" onClick={changeLanguage}>
        فارسی | English
      </button>
    </nav>
  );
}

export default Navbar;
