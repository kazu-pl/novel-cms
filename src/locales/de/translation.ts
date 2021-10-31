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
  },
  buttons: {
    submit: "einreichen",
    cancel: "Abbrechen",
    update: "Aktualisieren",
    delete: "löschen",
    selectFile: "Datei aussuchen",
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
  notFoundPage: {
    title: "nicht gefunden",
    metaData: {
      description: "nicht gefunden",
      imageAlt: "nicht gefunden",
    },
  },
};

export default de;
