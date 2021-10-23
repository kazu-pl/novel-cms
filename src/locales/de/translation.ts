import { Translation } from "../Translation";

const de: Translation = {
  form: {
    requiredFieldInputMsg: "Dieses Feld wird benötigt",
    wrongEmailMsg: "Falsches Emailformat",
    emailInputLabel: "Geben Sie Ihr email ein",
    passwordInputLabel: "Geben Sie Ihr Passwort ein",
    nameInputLabel: "Name",
    surnameInputLabel: "Nachname",
  },
  buttons: {
    submit: "einreichen",
    cancel: "Abbrechen",
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
  accountPage: {
    title: "Konto",
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
