import { Translation } from "../Translation";

const pl: Translation = {
  form: {
    requiredFieldInputMsg: "To pole jest wymagane",
    wrongEmailMsg: "Podaj poprawny email",
  },
  loginPage: {
    title: "Zaloguj się",
    submitButton: "Potwierdź",
    form: {
      emailInputLabel: "Wprowadź email",
      passwordInputLabel: "Wprowadź hasło",
    },
    metaData: {
      title: "Logownaie",
      descrption: "Strona do logowania",
      imageAlt: "obrazek logowania",
    },
  },
  dashboardPage: {
    userDropdown: {
      logout: "Wyloguj",
    },
    metaData: {
      title: "Dashboard",
      descrption: "Strona do zarządzania",
      imageAlt: "obrazek zarządzania",
    },
  },
  notFoundPage: {
    title: "nie znaleziono",
    metaData: {
      description: "nie znaleziono strony",
      imageAlt: "brak strony",
    },
  },
};

export default pl;
