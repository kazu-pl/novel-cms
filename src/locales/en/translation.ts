import { Translation } from "../Translation";

const en: Translation = {
  form: {
    requiredFieldInputMsg: "This field is required",
    wrongEmailMsg: "Wrong email format",
  },
  loginPage: {
    title: "Login",
    submitButton: "submit",
    form: {
      emailInputLabel: "Enter your email",
      passwordInputLabel: "Enter your password",
    },
    metaData: {
      title: "Login",
      descrption: "Login page description",
      imageAlt: "login image",
    },
  },
  dashboardPage: {
    userDropdown: {
      logout: "Logout",
    },
    metaData: {
      title: "Dashboard",
      descrption: "Dashboard page description",
      imageAlt: "Dashboard image",
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
