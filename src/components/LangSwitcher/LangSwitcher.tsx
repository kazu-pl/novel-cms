import NovelLangSwicher from "novel-ui/lib/LangSwitcher";
import { useTranslation } from "react-i18next";
import usePathWithoutLang from "common/router/usePathWithoutLang";
import getLocalizedPath from "common/router/useLocalizedPath";
import { Lang } from "locales";

const FlagWrapper = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div
      style={{
        width: 20, // set the same height as width if want to use in appBar
        height: 20, // because when click on lang btn, MUI will create oval clicked shape (should be circle)
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={src} alt={alt} width={20} />
    </div>
  );
};

const LangSwicher = () => {
  const { i18n } = useTranslation();
  const { pathWithoutLang } = usePathWithoutLang();
  const { path } = getLocalizedPath();

  return (
    <NovelLangSwicher
      activeLang={i18n.language}
      langs={[
        {
          icon: (
            <FlagWrapper
              src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"
              alt="de"
            />
          ),
          to: path(pathWithoutLang, "de" as Lang),
          lang: "de" as Lang,
          label: "Germany",
        },
        {
          icon: (
            <FlagWrapper
              src="https://upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg"
              alt="pl"
            />
          ),
          to: path(pathWithoutLang, "pl" as Lang),
          lang: "pl" as Lang,
          label: "Polski",
        },
        {
          icon: (
            <FlagWrapper
              src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg"
              alt="en"
            />
          ),
          to: path(pathWithoutLang, "en" as Lang),
          lang: "en" as Lang,
          label: "English",
        },
      ]}
    />
  );
};

export default LangSwicher;
