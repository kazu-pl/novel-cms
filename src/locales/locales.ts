export interface Translation {
  title: string;
  navigation: {
    homepage: string;
    login: string;
    account: string;
  };
  description: {
    part1: string;
    part2: string;
  };
}

export type Lang = "pl" | "en" | "de"; // those literals are names of folders with tranalstions

export const extendedAvaliableLangs: {
  langFullName: string;
  lang: Lang;
  iconUrl: string;
}[] = [
  {
    langFullName: "Polski",
    lang: "pl",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg",
  },
  {
    langFullName: "English",
    lang: "en",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg",
  },
  {
    langFullName: "Germany",
    lang: "de",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
  },
];

export const avaliableLanguages: Lang[] = extendedAvaliableLangs.reduce(
  (prev, current) => [...prev, current.lang],
  [] as Lang[]
);

export const fallbackLng: Lang = "pl"; // it's default lang for "/" pages (pages without lang prefix)
