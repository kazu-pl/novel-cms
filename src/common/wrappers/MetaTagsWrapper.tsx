import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";

const MetaTagsWrapper = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language;

  const getTitle = (lang: string) => {
    switch (lang) {
      case "pl":
        return "to jest strona glówna";
      case "en":
        return "This is main site";
      case "de":
        return "Dies ist die Hauptseite";
      default:
        return "";
    }
  };

  return (
    <>
      <HelmetDecorator
        lang={currentLang}
        title={getTitle(currentLang)}
        description={getTitle(currentLang)}
        imageUrl="https://sm.ign.com/ign_pl/screenshot/default/attack-on-titan-review1-1024x576_qh1d.jpg"
        imageAlt="home image"
      />
      {children}
    </>
  );
};

export default MetaTagsWrapper;
