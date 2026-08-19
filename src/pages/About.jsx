import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  return (
    <div className="page about-page">
      <h1>{t("about.title")}</h1>
      <p className="about-text">{t("about.text")}</p>

      {t("about.featuresTitle") && (
        <div className="about-features">
          <h2>{t("about.featuresTitle")}</h2>
          <ul>
            <li>{t("about.feature1")}</li>
            <li>{t("about.feature2")}</li>
            <li>{t("about.feature3")}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default About;
