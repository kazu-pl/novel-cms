export interface Translation {
  form: {
    requiredFieldInputMsg: string;
    wrongEmailMsg: string;
    emailInputLabel: string;
    passwordInputLabel: string;
    nameInputLabel: string;
    surnameInputLabel: string;
    forgotPassword: string;
  };
  buttons: {
    submit: string;
    cancel: string;
    update: string;
    delete: string;
    selectFile: string;
  };
  loginPage: {
    title: string;
    metaData: {
      title: string;
      descrption: string;
      imageAlt: string;
    };
  };
  dashboardPage: {
    sidebar: {
      dashboard: string;
      account: string;
    };
    userDropdown: {
      account: string;
      logout: string;
    };
    metaData: {
      descrption: string;
      imageAlt: string;
      title: string;
    };
  };
  accountPage: {
    title: string;
    forms: {
      account: { title: string };
      password: { title: string };
      avatar: { title: string };
    };
    metaData: {
      descrption: string;
      imageAlt: string;
      title: string;
    };
  };
  forgotPassword: {
    title: string;
    description: string;
    links: {
      login: string;
      dashboard: string;
    };
    metaData: {
      descrption: string;
      imageAlt: string;
      title: string;
    };
  };
  resetPasswordPage: {
    title: string;
    metaData: {
      descrption: string;
      imageAlt: string;
      title: string;
    };
  };
  notFoundPage: {
    title: string;
    metaData: {
      description: string;
      imageAlt: string;
    };
  };
}
