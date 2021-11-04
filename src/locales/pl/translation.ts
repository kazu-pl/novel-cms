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
    enterTitle: "Wprowadź tytuł",
    enterDescription: "Wprowadź opis",
  },
  buttons: {
    add: "dodaj",
    submit: "potwierdź",
    cancel: "anuluj",
    update: "aktualizuj",
    delete: "usuń",
    selectFile: "wybierz plik",
  },
  dashboardSidebarItems: {
    dashboard: "Dashboard",
    account: "konto",
    scenery: {
      title: "tła",
      items: {
        list: "tła - lista",
        add: "dodaj nowe tło",
      },
    },
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
    forms: {
      password: {
        title: "Zmień hasło",
      },
      account: {
        title: "Zmień dane konta",
      },
      avatar: {
        title: "Zmień Avatar",
      },
    },
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
  SceneryPages: {
    list: {
      title: "Tła",
      table: {
        title: " tła - lista",
        columns: {
          title: "tytuł",
          description: "opis",
          total: "liczba zdjęć",
          actions: "akcje",
        },
      },
      metaData: {
        description: "Strona z tłami do gry",
        imageAlt: "image alt",
        title: "Tła",
      },
    },
    add: {
      title: "Dodaj nowe tło",
      metaData: {
        description: "Strona dodawania nowego tła",
        imageAlt: "image alt",
        title: "Dodaj tło",
      },
    },
    edit: {
      title: "Edytuj tło",
      basicDataFormTitle: "Edytuj podstawowe dane",
      newImagesTitle: "Dodaj nowe zdjęcia",
      imagesGalleryTitle: "Galeria zdjęć",
      noImagesInGallery: "brak zdjęć",
      metaData: {
        description: "To jest strona do edycji tła",
        imageAlt: "image alt",
        title: "Edytuj Scenerię",
      },
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
