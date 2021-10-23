import { Translation } from "../Translation";

const pl: Translation = {
  form: {
    requiredFieldInputMsg: "To pole jest wymagane",
    wrongEmailMsg: "Podaj poprawny email",
    emailInputLabel: "Wprowadź email",
    passwordInputLabel: "Wprowadź hasło",
    nameInputLabel: "Imię",
    surnameInputLabel: "Nazwisko",
    forgotPassword: "Zapomniałem hasła",
  },
  buttons: {
    submit: "potwierdź",
    cancel: "anuluj",
  },
  loginPage: {
    title: "Zaloguj się",
    metaData: {
      title: "Logowanie",
      descrption: "Strona do logowania",
      imageAlt: "obrazek logowania",
    },
  },
  dashboardPage: {
    sidebar: {
      dashboard: "dashboard",
      account: "Konto",
    },
    userDropdown: {
      account: "Konto",
      logout: "Wyloguj",
    },
    metaData: {
      title: "Dashboard",
      descrption: "Strona do zarządzania",
      imageAlt: "obrazek zarządzania",
    },
  },
  accountPage: {
    title: "Konto",
    metaData: {
      title: "Konto",
      descrption: "moje konto",
      imageAlt: "konto obrazek",
    },
  },
  forgotPassword: {
    title: "Zapomniałem hasła",
    description:
      "Zapomniałeś hasła? Podaj twój email. Wyślemy na niego link do resetowania hasła.",
    links: {
      login: "Logowanie",
      dashboard: "Dashboard",
    },
    metaData: {
      descrption:
        "Zapomniałeś hasła? Podaj twój email. Wyślemy na niego link do resetowania hasła.",
      imageAlt: "przypomnienie hasła",
      title: "Przypomnij hasło",
    },
  },
  resetPasswordPage: {
    title: "Ustaw nowe hasło",
    metaData: {
      descrption: "ustaw nowe hasło",
      imageAlt: "ustaw nowe hasło",
      title: "ustaw nowe hasło",
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
