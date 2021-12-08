import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import Typography from "@mui/material/Typography";
import Button from "novel-ui/lib/buttons/Button";
import { PATHS_DASHBOARD } from "common/constants/paths";
import useLocalizedPath from "common/router/useLocalizedPath";
import Box from "@mui/material/Box";

const NotFound = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const { path } = useLocalizedPath();
  return (
    <>
      <HelmetDecorator
        description={t("notFoundPage.SEO.description")}
        imageAlt={t("notFoundPage.SEO.imageAlt")}
        imageUrl="https://sm.ign.com/ign_pl/screenshot/default/attack-on-titan-review1-1024x576_qh1d.jpg"
        lang={currentLang}
        title="404"
      />
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">{t("notFoundPage.title")}</Typography>
      <Box
        maxWidth="600px"
        width="100%"
        mt={2}
        display="flex"
        justifyContent="flex-end"
      >
        <Button to={path(PATHS_DASHBOARD.DASHBOARD)} variant="contained">
          {t("notFoundPage.goToMainPageBtn")}
        </Button>
      </Box>
    </>
  );
};

export default NotFound;
