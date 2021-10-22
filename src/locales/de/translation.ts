import { Translation } from "../Translation";

const de: Translation = {
  form: {
    requiredFieldInputMsg: "Dieses Feld wird benötigt",
    wrongEmailMsg: "Falsches Emailformat",
  },
  loginPage: {
    title: "Anmeldung",
    submitButton: "einreichen",
    form: {
      loginInputLabel: "Geben Sie Ihr Login ein",
      passwordInputLabel: "Geben Sie Ihr Passwort ein",
    },
    metaData: {
      title: "Anmeldung",
      descrption: "Bezeichnung Anmeldung",
      imageAlt: "Bild Anmeldung",
    },
  },
  dashboardPage: {
    userDropdown: {
      logout: "Ausloggen",
    },
    metaData: {
      title: "Dashboard",
      descrption: "Seite Dashboard",
      imageAlt: "Bild Dashboard",
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
