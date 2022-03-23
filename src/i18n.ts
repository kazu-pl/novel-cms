import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { avaliableLanguages } from "locales";
// import { fallbackLng } from "locales";

// want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn

i18n
  // IMPORTANT!!! below way to turn files into lazy loading resources found here: https://www.i18next.com/how-to/add-or-load-translations#lazy-load-in-memory-translations
  .use(
    resourcesToBackend((language, namespace, callback) => {
      import(`./locales/${language}/${namespace}.ts`)
        .then((resources) => {
          callback(null, resources.default); // IMPORTANT!!! NEED to use .default because resource is a module here, not the exported value itself
        })
        .catch((error) => {
          callback(error, null);
        });
    })
  )
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // fallbackLng, // IMPORTANT!!! default lang (will be downloaded even if you switched to other and refreshed page - you will download 2 langs then) that will be used if user has browser lang set to a lang that you didn't provide. I DISABLED IT BECAUSE IN URL-BASED LOCALIZATION IT'S NOT AS MUCH USEFUL BECAUSE YOU WILL NEED TO DOWNLOAD TRANSLATION FILE BASED ON URL ANYWAY (you won't be able to change translation without changing url so fallbackLng option is useless)
    fallbackLng: false,
    debug: process.env.NODE_ENV === "development", // IMPORTANT!!!
    supportedLngs: avaliableLanguages, // whitelist prop was surpased by supportedLngs ?
    // whitelist: avaliableLanguages, // IMPORTANT!!! needed because without whitelist with explicitly specified langs react-snap would create files for 'en-US' langs even if you use just 'en'  (react-snap would create both routes)

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
