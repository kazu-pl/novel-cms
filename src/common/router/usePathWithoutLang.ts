import { avaliableLanguages, Lang } from "locales";

const usePathWithoutLang = () => {
  const getPathWithoutLang = () => {
    const path = window.location.href.slice(window.location.origin.length); // path without webiste url e.g. '/pl/account#some_anchor'
    const pathElements = path.split("/");
    let newPath;

    if (pathElements.length >= 3) {
      // ROUTES LIKE:
      // 1 - /pl/account/   // <-- EXACTLY 2 items like /pl/account or /asd/fgh (also can contain hashs or search)
      // 2 - /pl/account/any/longer/path#anchor?search=some_value    // <-- more than 3 items (also can contain hashs or search)
      // 3 - /login/asd/asd   // <-- the same case as 2 but first item don't have to be only lang prefix, it can be anything

      const pathElementsWithoutLangPrefix = avaliableLanguages.includes(
        pathElements[1] as Lang // pathElements[1] because pathElements[0] is always empty "" string because it splits first / in url into separate item
      )
        ? pathElements.slice(2) // if pathElements[1] was element from avaliableLanguages then slice array after lang to get rid of lang
        : pathElements.slice(1); // if pathElements[1] wasn't in from avaliableLanguages it means we are on path for default lang so everyting is path elements

      const fullUrlWithoutLangPrefix = pathElementsWithoutLangPrefix.join("/");

      newPath = `/${fullUrlWithoutLangPrefix}`;
    } else {
      // ROUTES LIKE: "/de" OR "/de/" OR "" [empty string] OR "/account"

      newPath = avaliableLanguages.includes(pathElements[1] as Lang)
        ? ``
        : `/${pathElements[1]}`;
    }

    return newPath;
  };

  return {
    pathWithoutLang: getPathWithoutLang(),
  };
};

export default usePathWithoutLang;
