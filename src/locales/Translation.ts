export interface Translation {
  form: {
    requiredFieldInputMsg: string;
    wrongEmailMsg: string;
  };
  loginPage: {
    title: string;
    submitButton: string;
    form: {
      loginInputLabel: string;
      passwordInputLabel: string;
    };
    metaData: {
      title: string;
      descrption: string;
      imageAlt: string;
    };
  };
  dashboardPage: {
    userDropdown: {
      logout: string;
    };
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
