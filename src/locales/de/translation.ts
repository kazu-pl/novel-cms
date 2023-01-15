import { Translation } from "../Translation";

const de: Translation = {
  title: "Titel",
  description: "Bezeichnung",
  loading: "Wird geladen",
  customizeTable: "ändern Sie die Tabelle",
  search: "Suche",
  default: "Ursprünglich",
  fixedColumnWarning:
    "Die Reihenfolge der festen Spalte kann nicht geändert werden",
  notifications: {
    sessionEnd:
      "Sitzung beendet. Einloggen um zur vorherigen Seite zu gelangen",
  },
  cancelNotifications: {
    login: "Login-Aktion abgebrochen",
  },
  graphs: {
    charactersImagesCounter: "Anzahl der Fotos einzelner Charaktere",
    sceneriesImagesCounter: "Anzahl Fotos einzelner Szenerien",
    actScenesAmount: "Anzahl Szenen einzelner Akte",
    actDialogsAmount: "Anzahl Dialoge einzelner Akte",
    imagesAmount: "Bilder Menge",
    scenesAmount: "Szenen Menge",
    dialogsAmount: "Dialoge Menge",
  },
  form: {
    rememberMe: "behalte mich in Erinnerung",
    requiredFieldInputMsg: "Dieses Feld wird benötigt",
    wrongEmailMsg: "Falsches Emailformat",
    emailInputLabel: "Geben Sie Ihr email ein",
    passwordInputLabel: "Geben Sie Ihr Passwort ein",
    nameInputLabel: "Name",
    surnameInputLabel: "Nachname",
    forgotPassword: "Ich habe mein Passwort vergessen",
    enterTitle: "Titel eingeben",
    enterDescription: "Beschreibung eingeben",
    number: {
      min: "minimal zulässiger Wert ist:",
      max: "maximal zulässiger Wert ist:",
    },
  },
  buttons: {
    add: "hinzufügen",
    submit: "einreichen",
    cancel: "Abbrechen",
    update: "Aktualisieren",
    delete: "löschen",
    selectFile: "Datei aussuchen",
    selectAll: "Wählen Sie Alle",
    edit: "bearbeiten",
    pasteBtnsCombination:
      "Wenn Sie Daten bearbeiten möchten, drücken Sie CTRL + V, um Modal zu öffnen, oder klicken Sie auf die Schaltfläche",
  },
  dashboardSidebarItems: {
    dashboard: "Dashboard",
    account: "Konto",
    scenery: {
      title: "Landschaften",
      items: {
        list: "Liste der Landschaften",
        add: "neue hinzufügen",
      },
    },
    character: {
      title: "Personen",
      items: {
        list: "Liste der Charaktere",
        add: "neue hinzufügen",
      },
    },
    acts: {
      title: "Kapitel",
      items: { list: "Liste der Kapitel", add: "hinzufügen" },
    },
  },
  loginPage: {
    title: "Anmeldung",
    metaData: {
      title: "Anmeldung",
      descrption: "Bezeichnung Anmeldung",
      imageAlt: "Bild Anmeldung",
    },
  },
  dashboardPage: {
    sidebar: {
      dashboard: "Dashboard",
      account: "Konto",
    },
    userDropdown: {
      account: "Konto",
      logout: "Ausloggen",
    },
    metaData: {
      title: "Dashboard",
      descrption: "Seite Dashboard",
      imageAlt: "Bild Dashboard",
    },
  },
  forgotPassword: {
    title: "Ich habe mein Passwort vergessen",
    description:
      "Hast du dein Passwort vergessen? Hinterlassen Sie Ihre E-Mail. Wir senden Ihnen den Link zum Zurücksetzen des Passworts.",
    links: {
      login: "Anmeldung",
      dashboard: "Dashboard",
    },
    metaData: {
      descrption:
        "Hast du dein Passwort vergessen? Hinterlassen Sie Ihre E-Mail. Wir senden Ihnen den Link zum Zurücksetzen des Passworts.",
      imageAlt: "Erinnerung password",
      title: "Passwort vergessen",
    },
  },
  resetPasswordPage: {
    title: "Neues Passwort setzen",
    metaData: {
      descrption: "Neues Passwort setzen",
      imageAlt: "Neues Passwort setzen",
      title: "Neues Passwort setzen",
    },
  },
  accountPage: {
    title: "Konto",
    forms: {
      password: {
        title: "Kontodaten ändern",
      },
      account: {
        title: "Passwort ändern",
      },
      avatar: {
        title: "Avatar ändern",
      },
    },
    metaData: {
      title: "Account",
      descrption: "mein Account",
      imageAlt: "Account Bild",
    },
  },
  SceneryPages: {
    list: {
      title: "Landschaftsliste",
      table: {
        title: "Liste der Landschaften",
        columns: {
          title: "Titel",
          description: "Bezeichnung",
          total: "Gesamtbilder",
          actions: "Aktionen",
          createdAt: "hergestellt in",
        },
      },
      modal: {
        headlineText: "Landschaft löschen",
        sceneryPretitle: "Zu löschende Szenerie:",
        text: "Möchten Sie die Szenerie wirklich löschen? Dies kann später nicht mehr rückgängig gemacht werden.",
      },
      metaData: {
        description: "Landschaftsliste",
        imageAlt: "image alt",
        title: "Landschaftsliste",
      },
    },
    add: {
      title: "neuen Charakter hinzufügen",
      metaData: {
        description: "neuen Charakter hinzufügen",
        imageAlt: "image alt",
        title: "neue Szenerie",
      },
    },
    edit: {
      title: "Hintergrund bearbeiten",
      basicDataFormTitle: "Grunddaten bearbeiten",
      newImagesTitle: "Dodaj nowe zdjęcia",
      imagesGalleryTitle: "Neue Fotos hinzufügen",
      noImagesInGallery: "keine Bilder",
      modal: {
        headlineText: "Landschaftsbild löschen",
        sceneryPretitle: "Zu löschende Szenerie:",
        text: "Möchten Sie die Szenerie wirklich löschen? Dies kann später nicht mehr rückgängig gemacht werden.",
      },
      metaData: {
        description: "Dies ist eine Hintergrundbearbeitungsseite",
        imageAlt: "image alt",
        title: "Bearbeiten Landschaft",
      },
    },
  },
  CharacterPages: {
    list: {
      title: "Liste der Charaktere",
      table: {
        title: "Liste der Charaktere",
        columns: {
          title: "Titel",
          description: "Bezeichnung",
          total: "Gesamtbilder",
          actions: "Aktionen",
          createdAt: "hergestellt in",
        },
      },
      modal: {
        headlineText: "Person löschen",
        sceneryPretitle: "zu entfernende Person:",
        text: "Möchten Sie diese Person wirklich löschen? Dies kann später nicht mehr rückgängig gemacht werden",
      },
      metaData: {
        description: "Charakter",
        imageAlt: "image alt",
        title: "Charakter",
      },
    },
    add: {
      title: "neuen Charakter hinzufügen",
      metaData: {
        description: "neuen Charakter hinzufügen",
        imageAlt: "image alt",
        title: "neue Charakter",
      },
    },
    edit: {
      title: "Charakter bearbeiten",
      basicDataFormTitle: "Grunddaten bearbeiten",
      newImagesTitle: "Dodaj nowe zdjęcia",
      imagesGalleryTitle: "Neue Fotos hinzufügen",
      noImagesInGallery: "keine Bilder",
      modal: {
        headlineText: "Charakter löschen",
        sceneryPretitle: "Zu löschende Szenerie:",
        text: "Möchten Sie diesen Charakter wirklich löschen? Dies kann später nicht mehr rückgängig gemacht werden.",
      },
      metaData: {
        description: "Dies ist eine Charakterbearbeitungsseite",
        imageAlt: "image alt",
        title: "Charakter bearbeiten",
      },
    },
  },
  actsPages: {
    list: {
      title: "Liste der Kapitel",
      table: {
        title: "Kapitels",
        columns: {
          title: "Titel",
          description: "Bezeichnung",
          scenesTotal: "Gesamtzahl der Szenen",
          nextAct: "Nächste Akt-ID",
          createdAt: "hergestellt in",
          type: "type",
          actions: "Aktionen",
        },
      },
      modal: {
        headlineText: "Kapitel löschen",
        sceneryPretitle: "Zu löschende Kapitel:",
        text: "Möchten Sie diesen Kapitels wirklich löschen? Dies kann später nicht mehr rückgängig gemacht werden.",
      },
      metaData: {
        description: "Liste der Kapitelt",
        imageAlt: "Liste der Kapitelt",
        title: "Liste der Kapitelt",
      },
    },
    add: {
      title: "Neues Kapitel hinzufügen",
      actForm: {
        type: "Aktart",
        nextAct: "Nächster Akt",
      },
      scenePart: {
        title: "Szenes",
        addNewSceneBtn: "Neue Szene hinzufügen",
        addSceneBtn: "Neue hinzufügen",
        editSceneBtn: "Szene bearbeiten",
        form: {
          title: "Neuen Szene hinzufügen",
          editSceneTitle: "Du bearbeitest die Szene",
          selectSceneryId: "Landschaft auswählen",
          selectSceneryBg: "Hintergrund auswählen",
        },
        modal: {
          headlineText: "Szene löschen",
          sceneryPretitle: "Szene: ",
          text: "Möchten Sie diese Szene wirklich löschen? Denken Sie daran, dass Sie die Szene aus dem temporären Speicher des Akts löschen. Um die Szene vollständig zu löschen, aktualisieren Sie den Act.",
        },
      },
      dialogForm: {
        title: "Dialogs",
        characterSayingText: "Lautsprecher",
        text: "text",
        dialogsInScene: {
          title: "Dialoge in dieser Szene",
          character: "Charakters",
          text: "Text",
        },
        modal: {
          title: "Dialog löschen",
          speaker: "Lautsprecher",
          text: "Text",
          info: `Möchten Sie den Dialog wirklich löschen? Mit dem Absenden löschen Sie es nur aus dem Editieraktenspeicher. Denken Sie daran, dass Sie Scene und Act aktualisieren müssen, um diesen Dialog wirklich zu löschen.`,
        },
        characterFormTitle: "Charakters",
        PreviewTooltip:
          "Klicken Sie hier, um den Dialog im Vorschaufenster anzuzeigen",
        putInQuoteTooltip: `Anführungszeichen hinzufügen " "`,
        addDialogBtn: "Dialog hinzufügen",
        addNewDialogBtn: "Neuen Dialog hinzufügen",
        editDialogBtn: "Dialog bearbeiten",
      },
      charactersOnScreen: {
        list: {
          character: "Charakter",
        },
        form: {
          characterName: "Charakter",
          PreviewTooltip:
            "Klicken Sie hier, um die Charaktere anzuzeigen, bevor Sie sie hinzufügen",
          copyFromPrev: "Zeichen aus dem vorherigen Dialog kopieren",
          editCharBtn: "Bearbeite den Charakter",
          addCharBtn: "Füge einen Charakter hinzu",
          addNewCharBtn: "Füge einen neuen Charakter hinzu",
        },
      },
      metaData: {
        description: "Kapitel der Spielgeschichte",
        imageAlt: "image alt",
        title: "Kapitel",
      },
    },
    edit: {
      title: "Akt bearbeiten",
      metaData: {
        description: "Akt bearbeiten",
        imageAlt: "img alt",
        title: "Akt bearbeiten",
      },
    },
  },
  filesPages: {
    common: {
      fullScreenTooltip: "Im Vollbildmodus sehen",
    },
  },
  notFoundPage: {
    title: "nicht gefunden",
    goToMainPageBtn: "Gehe zum Dashboard",
    metaData: {
      description: "nicht gefunden",
      imageAlt: "nicht gefunden",
    },
  },
};

export default de;
