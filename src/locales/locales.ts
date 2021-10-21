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

export const avaliableLanguages = ["pl", "en", "de"]; // this has to be string[] type because in Route.tsx I'm checking if avaliableLanguages includes a lang obtained from url which of course is allways string type

export const fallbackLng: Lang = "pl"; // it's default lang for "/" page in react-snap and in browser (but only if fallbackLng in src/i18n.ts is COMMENTED - see src/i18n.ts for more info)
