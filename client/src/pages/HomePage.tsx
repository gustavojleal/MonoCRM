import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div className="main">
      <h1>{t("dashboard")}</h1>
    </div>
  );
}
export default HomePage;