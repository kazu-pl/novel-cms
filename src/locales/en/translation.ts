import { Translation } from "../Translation";

const en: Translation = {
  form: {
    requiredFieldInputMsg: "This field is required",
    wrongEmailMsg: "Wrong email format",
    emailInputLabel: "Enter your email",
    passwordInputLabel: "Enter your password",
    nameInputLabel: "Name",
    surnameInputLabel: "Surname",
    forgotPassword: "I forgot my password",
  },
  buttons: {
    submit: "Submit",
    cancel: "Cancel",
    update: "Update",
    delete: "Delete",
    selectFile: "Select file",
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
    forms: {
      password: {
        title: "Change account data",
      },
      account: {
        title: "Change password",
      },
      avatar: {
        title: "Change Avatar",
      },
    },
    metaData: {
      title: "Account",
      descrption: "my Account",
      imageAlt: "Account img",
    },
  },
  forgotPassword: {
    title: "forgot Password",
    description:
      "Have you forgotten your password? Leave your email. We will send You resetting password link.",
    links: {
      login: "Login",
      dashboard: "Dashboard",
    },
    metaData: {
      descrption:
        "Have you forgotten your password? Leave your email. We will send You resetting password link.",
      imageAlt: "Reminding password",
      title: "forgot Password",
    },
  },
  resetPasswordPage: {
    title: "Set new password",
    metaData: {
      descrption: "Set new password",
      imageAlt: "Set new password",
      title: "Set new password",
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
