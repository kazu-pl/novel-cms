import { Translation } from "../Translation";

const de: Translation = {
  form: {
    requiredFieldInputMsg: "Dieses Feld wird benötigt",
    wrongEmailMsg: "Falsches Emailformat",
    emailInputLabel: "Geben Sie Ihr email ein",
    passwordInputLabel: "Geben Sie Ihr Passwort ein",
    nameInputLabel: "Name",
    surnameInputLabel: "Nachname",
    forgotPassword: "Ich habe mein Passwort vergessen",
    enterTitle: "Titel eingeben",
    enterDescription: "Beschreibung eingeben",
  },
  buttons: {
    add: "hinzufügen",
    submit: "einreichen",
    cancel: "Abbrechen",
    update: "Aktualisieren",
    delete: "löschen",
    selectFile: "Datei aussuchen",
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
      metaData: {
        description: "Dies ist eine Charakterbearbeitungsseite",
        imageAlt: "image alt",
        title: "Charakter bearbeiten",
      },
    },
  },
  notFoundPage: {
    title: "nicht gefunden",
    metaData: {
      description: "nicht gefunden",
      imageAlt: "nicht gefunden",
    },
  },
};

export default de;
