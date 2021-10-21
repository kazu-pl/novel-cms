import { StyledTitle } from "./NotFound.styled";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";

const NotFound = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  return (
    <>
      <HelmetDecorator
        description="this is not found page"
        imageAlt="home image"
        imageUrl="https://sm.ign.com/ign_pl/screenshot/default/attack-on-titan-review1-1024x576_qh1d.jpg"
        lang={currentLang}
        title="404"
      />
      <StyledTitle>NotFound</StyledTitle>
    </>
  );
};

export default NotFound;
