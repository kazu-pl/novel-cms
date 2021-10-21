import NovelLangSwicher from "novel-ui/lib/LangSwitcher";
import FlagWrapper from "./FlagWrapper";

import { useTranslation } from "react-i18next";

import usePathWithoutLang from "common/router/usePathWithoutLang";
import getLocalizedPath from "common/router/useLocalizedPath";

import { extendedAvaliableLangs } from "locales/locales";

const LangSwicher = () => {
  const { i18n } = useTranslation();
  const { pathWithoutLang } = usePathWithoutLang();
  const { path } = getLocalizedPath();

  return (
    <>
      <NovelLangSwicher
        activeLang={i18n.language}
        langs={extendedAvaliableLangs.map((item) => ({
          icon: <FlagWrapper src={item.iconUrl} alt={`${item.lang} flag`} />,
          to: path(pathWithoutLang, item.lang),
          lang: item.lang,
          label: item.langFullName,
        }))}
      />
    </>
  );
};

export default LangSwicher;

// ---------------------------------------------------------

// TODO:

// 3 - trzeba ogarnąć tłumaczenia słów
// 4 - pousuwać zbędne console.logi itd
// 7 - zrobić update readme mojego repo z i18n. Dodałem już info o link vs history.push() oraz error z console.logiem ale trzeba też zrobić update readme np jak dodawać nowe języki itd
