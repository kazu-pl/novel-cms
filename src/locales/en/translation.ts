import { Translation } from "../Translation";

const en: Translation = {
  form: {
    requiredFieldInputMsg: "This field is required",
    wrongEmailMsg: "Wrong email format",
    emailInputLabel: "Enter your email",
    passwordInputLabel: "Enter your password",
    nameInputLabel: "Name",
    surnameInputLabel: "Surname",
  },
  buttons: {
    submit: "Submit",
    cancel: "Cancel",
  },
  loginPage: {
    title: "Login",
    metaData: {
      title: "Login",
      descrption: "Login page description",
      imageAlt: "login image",
    },
  },
  dashboardPage: {
    sidebar: {
      dashboard: "dashboard",
      account: "account",
    },
    userDropdown: {
      account: "Account",
      logout: "Logout",
    },
    metaData: {
      title: "Dashboard",
      descrption: "Dashboard page description",
      imageAlt: "Dashboard image",
    },
  },
  accountPage: {
    title: "Account",
    metaData: {
      title: "Account",
      descrption: "my Account",
      imageAlt: "Account img",
    },
  },
  notFoundPage: {
    title: "Not found",
    metaData: {
      description: "Not found",
      imageAlt: "Not found",
    },
  },
};

export default en;
