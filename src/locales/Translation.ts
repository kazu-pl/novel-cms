export interface Translation {
  form: {
    requiredFieldInputMsg: string;
    wrongEmailMsg: string;
    emailInputLabel: string;
    passwordInputLabel: string;
    nameInputLabel: string;
    surnameInputLabel: string;
  };
  buttons: {
    submit: string;
    cancel: string;
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
