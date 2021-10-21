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
  };
  dashboardPage: {
    userDropdown: {
      logout: string;
    };
  };
  notFoundPage: {
    title: string;
    SEO: {
      description: string;
      imageAlt: string;
    };
  };
}
