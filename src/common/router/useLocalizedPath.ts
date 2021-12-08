import { fallbackLng, Lang } from "locales";
import { useTranslation } from "react-i18next";

const validateSlashBeforePath = (path: string) => {
  return path === "" ? path : path[0] === "/" ? path : `/${path}`;
};

const useLocalizedPath = () => {
  const { i18n } = useTranslation();

  const getLocalizedPath = (path: string, lang?: Lang) => {
    const correctLang = lang || i18n.language;

    const correctPath = path === "/" ? "" : path;

    return correctLang === fallbackLng
      ? (path === "" && "/") || path
      : `/${correctLang}${validateSlashBeforePath(correctPath)}`;
  };

  return {
    path: getLocalizedPath,
  };
};

export default useLocalizedPath;
