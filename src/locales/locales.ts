import flagPL from "./pl/flagPL.svg";
import flagEN from "./en/flagEN.svg";
import flagDE from "./de/flagDE.svg";

// those literals are names of folders with tranalstions
export type Lang = "pl" | "en" | "de";

export const extendedAvaliableLangs: {
  langFullName: string;
  lang: Lang;
  iconUrl: string;
}[] = [
  {
    langFullName: "Polski",
    lang: "pl",
    iconUrl: flagPL,
    // iconUrl:
    // "https://upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg",
  },
  {
    langFullName: "English",
    lang: "en",
    iconUrl: flagEN,
    // iconUrl:
    // "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg",
  },
  {
    langFullName: "Germany",
    lang: "de",
    iconUrl: flagDE,
    // iconUrl:
    // "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
  },
];

export const avaliableLanguages: Lang[] = extendedAvaliableLangs.reduce(
  (prev, current) => [...prev, current.lang],
  [] as Lang[]
);

export const fallbackLng: Lang = "pl"; // it's default lang for "/" pages (pages without lang prefix)
