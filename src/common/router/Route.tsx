import { useCallback, useLayoutEffect } from "react";
import {
  Route as ReactRouterRoute,
  RouteProps as ReactRouterRouteProps,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { avaliableLanguages, fallbackLng, Lang } from "locales";
import { NOT_FOUND_LINK_WITHOUT_SLASH } from "common/constants/paths";

export interface RouteProps extends ReactRouterRouteProps {}

const Route = (props: RouteProps) => {
  const location = useLocation();
  const { i18n } = useTranslation();

  const potentialyLangFromUrl = location.pathname.split("/")[1];
  const currenti18nLang = i18n.language;

  const checkLang = useCallback(() => {
    if (potentialyLangFromUrl === "" && currenti18nLang === fallbackLng) {
      // main site, on first website visit it will be this condition, bcs fallbackLng is set as default in i18n.ts
      return;
    } else if (
      potentialyLangFromUrl === "" &&
      currenti18nLang !== fallbackLng
    ) {
      // if you entered "/" page but you have other language that the default one (for example, you entered the webiste once, changed language to other that default, closed the page and entered again "/" page)
      // i18n.changeLanguage(fallbackLng);
      i18n.changeLanguage(fallbackLng); // on page "/" it always will be default/fallback lang BOTH in browser and react-snap (it's needed for react-snap to make index.html for "/" with correct tags based on fallback/default lang)
    } else if (avaliableLanguages.includes(potentialyLangFromUrl as Lang)) {
      // proper lang in url, e.g. : "/en/login"
      potentialyLangFromUrl !== currenti18nLang &&
        i18n.changeLanguage(potentialyLangFromUrl); // will not change lang if someone is clicking the same change lng btn a couple of times
    } else {
      // /404
      // /login
      // /login/user/account

      if (
        potentialyLangFromUrl !== NOT_FOUND_LINK_WITHOUT_SLASH &&
        i18n.language !== fallbackLng
      ) {
        // when you were on e.g. "/de/login" and then changed to "/login"
        i18n.changeLanguage(fallbackLng);
      }
    }
  }, [potentialyLangFromUrl, i18n, currenti18nLang]);

  useLayoutEffect(() => {
    checkLang();
  }, [checkLang]);

  return <ReactRouterRoute {...props} />;
};

export default Route;
