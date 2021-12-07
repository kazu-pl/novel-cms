import { Translation } from "../Translation";

const pl: Translation = {
  notifications: {
    sessionEnd: "Wygasły token. Zaloguj się aby przejść na poprzednią stronę",
  },
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
    number: {
      min: "minimalna wartość to:",
      max: "maksymalna wartość to:",
    },
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
    character: {
      title: "Postacie",
      items: {
        list: "Lista postaci",
        add: "Dodaj nową postać",
      },
    },
    acts: {
      title: "Rozdziały",
      items: {
        list: "Lista rozdziałów",
        add: "Dodaj nowy rozdział",
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
          createdAt: "data utworzenia",
        },
      },
      modal: {
        headlineText: "Usuwanie tła",
        sceneryPretitle: "Tło do usunięcia: ",
        text: "Czy jesteś pewien, że chcesz usunąć to tło? Tej operacji nie można cofnąć.",
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
      modal: {
        headlineText: "Usuwanie zdjęcia scenerii",
        sceneryPretitle: "Zdjęcie do usunięcia: ",
        text: "Czy jesteś pewien, że chcesz usunąć to zdjęcie? Tej operacji nie można cofnąć.",
      },
      metaData: {
        description: "To jest strona do edycji tła",
        imageAlt: "image alt",
        title: "Edytuj Scenerię",
      },
    },
  },
  CharacterPages: {
    list: {
      title: "Postacie",
      table: {
        title: " Lista Postaci",
        columns: {
          title: "tytuł",
          description: "opis",
          total: "liczba zdjęć",
          actions: "akcje",
          createdAt: "data utworzenia",
        },
      },
      modal: {
        headlineText: "Usuwanie postaci",
        sceneryPretitle: "Postać do usunięcia: ",
        text: "Czy jesteś pewien, że chcesz usunąć tę Postać? Tej operacji nie można cofnąć.",
      },
      metaData: {
        description: "Strona z postaciami",
        imageAlt: "image alt",
        title: "Postacie",
      },
    },
    add: {
      title: "Dodaj nową postać",
      metaData: {
        description: "Strona dodawania nowej postaci",
        imageAlt: "image alt",
        title: "Dodaj postać",
      },
    },
    edit: {
      title: "Edytuj postać",
      basicDataFormTitle: "Edytuj podstawowe dane",
      newImagesTitle: "Dodaj nowe zdjęcia",
      imagesGalleryTitle: "Galeria zdjęć",
      noImagesInGallery: "brak zdjęć",
      modal: {
        headlineText: "Usuwanie zdjęcia postaci",
        sceneryPretitle: "Zdjęcie do usunięcia: ",
        text: "Czy jesteś pewien, że chcesz usunąć to zdjęcie? Tej operacji nie można cofnąć.",
      },
      metaData: {
        description: "To jest strona do edycji postaci",
        imageAlt: "image alt",
        title: "Edytuj postać",
      },
    },
  },
  actsPages: {
    list: {
      title: "Lista rozdzialów",
      table: {
        title: "Rozdziały",
        columns: {
          title: "Tytuł",
          description: "Opis",
          scenesTotal: "Liczba scen",
          nextAct: "Następny act",
          createdAt: "Utworzono",
          type: "typ",
          actions: "Akcje",
        },
      },
      modal: {
        headlineText: "Usuwanie rozdziału",
        sceneryPretitle: "Rozdział do usunięcia: ",
        text: "Czy jesteś pewien, że chcesz usunąć ten rozdział? Tej operacji nie można cofnąć.",
      },
      metaData: {
        description: "Lista rozdzialów",
        imageAlt: "Lista rozdzialów",
        title: "Lista rozdzialów",
      },
    },
    add: {
      title: "Dodaj nowy rozdział",
      actForm: {
        type: "Typ rozdziału",
        nextAct: "Nastepny rozdział",
      },
      scenePart: {
        title: "Sceny",
        addNewSceneBtn: "Dodaj nową scenę",
        addSceneBtn: "Dodaj scenę",
        editSceneBtn: "Edytuj scenę",
        form: {
          title: "Dodaj nową scenę",
          editSceneTitle: "Edytujesz scenę",
          selectSceneryId: "Wybierz scenerię",
          selectSceneryBg: "Wybierz tło scenerii",
        },
        modal: {
          headlineText: "Usuwanie sceny",
          sceneryPretitle: "Scena: ",
          text: "Czy jesteś pewien, że chcesz usunąć tę scenę? Pamiętaj, że jeśli usuwasz scenę z już istniejącego aktu to usuwasz ją z pamięci tymczasowej aktu. Aby całkowicie usunąć scenę, zaktualizuj Akt.",
        },
      },
      dialogForm: {
        title: "Dialogi",
        characterSayingText: "Mówca",
        text: "Tekst",
        dialogsInScene: {
          title: "Dialogi w tej scenie",
          character: "Postać",
          text: "Tekst",
        },
        modal: {
          title: "Usuwanie dialogu",
          speaker: "Mówca",
          text: "Tekst",
          info: `Jesteś pewien, że chciałeś usunąć dialog? Potwierdzajac usuniesz dialog jedynie z roboczej pamięci aktu. Pamiętaj aby zaktualizować scenę i akt aby ostatecznie usunąć dialog.`,
        },
        characterFormTitle: "Postacie",
        PreviewTooltip: "Kliknij aby zobaczyć dialog",
        addDialogBtn: "dodaj dialog",
        addNewDialogBtn: "Dodaj nowy dialog",
        editDialogBtn: "Edytuj dialog",
      },
      charactersOnScreen: {
        list: {
          character: "Postać",
        },
        form: {
          characterName: "Postać",
          PreviewTooltip: "Kliknij aby zobaczyć postacie przed ich dodaniem",
          copyFromPrev: "Skopiuj postacie z poprzedniego dialogu",
          editCharBtn: "Edytuj postać",
          addCharBtn: "Dodaj postać",
          addNewCharBtn: "Dodaj nową postać",
        },
      },
      metaData: {
        description: "rozdziały gry",
        imageAlt: "image alt",
        title: "Dodaj rozdział",
      },
    },
    edit: {
      title: "Edytuj rozdzial",
      metaData: {
        description: "Strona do edycji rozdziału",
        imageAlt: "img alt",
        title: "Edytuj Rozdział",
      },
    },
  },
  notFoundPage: {
    title: "nie znaleziono",
    goToMainPageBtn: "wróć do dashbaordu",
    metaData: {
      description: "nie znaleziono strony",
      imageAlt: "brak strony",
    },
  },
};

export default pl;
