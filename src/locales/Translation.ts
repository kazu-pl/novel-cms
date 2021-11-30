export interface Translation {
  notifications: {
    sessionEnd: string;
  };
  form: {
    requiredFieldInputMsg: string;
    wrongEmailMsg: string;
    emailInputLabel: string;
    passwordInputLabel: string;
    nameInputLabel: string;
    surnameInputLabel: string;
    forgotPassword: string;
    enterTitle: string;
    enterDescription: string;
    number: {
      min: string;
      max: string;
    };
  };
  buttons: {
    add: string;
    submit: string;
    cancel: string;
    update: string;
    delete: string;
    selectFile: string;
  };
  dashboardSidebarItems: {
    dashboard: string;
    account: string;
    scenery: {
      title: string;
      items: {
        list: string;
        add: string;
      };
    };
    character: {
      title: string;
      items: {
        list: string;
        add: string;
      };
    };
    acts: {
      title: string;
      items: {
        list: string;
        add: string;
      };
    };
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
  SceneryPages: {
    list: {
      title: string;
      table: {
        title: string;
        columns: {
          title: string;
          description: string;
          total: string;
          actions: string;
          createdAt: string;
        };
      };
      modal: {
        headlineText: string;
        sceneryPretitle: string;
        text: string;
      };
      metaData: {
        description: string;
        imageAlt: string;
        title: string;
      };
    };
    add: {
      title: string;
      metaData: {
        description: string;
        imageAlt: string;
        title: string;
      };
    };
    edit: {
      title: string;
      basicDataFormTitle: string;
      newImagesTitle: string;
      imagesGalleryTitle: string;
      noImagesInGallery: string;
      modal: {
        headlineText: string;
        sceneryPretitle: string;
        text: string;
      };
      metaData: {
        description: string;
        imageAlt: string;
        title: string;
      };
    };
  };
  CharacterPages: {
    list: {
      title: string;
      table: {
        title: string;
        columns: {
          title: string;
          description: string;
          total: string;
          actions: string;
          createdAt: string;
        };
      };
      modal: {
        headlineText: string;
        sceneryPretitle: string;
        text: string;
      };
      metaData: {
        description: string;
        imageAlt: string;
        title: string;
      };
    };
    add: {
      title: string;
      metaData: {
        description: string;
        imageAlt: string;
        title: string;
      };
    };
    edit: {
      title: string;
      basicDataFormTitle: string;
      newImagesTitle: string;
      imagesGalleryTitle: string;
      noImagesInGallery: string;
      modal: {
        headlineText: string;
        sceneryPretitle: string;
        text: string;
      };
      metaData: {
        description: string;
        imageAlt: string;
        title: string;
      };
    };
  };
  actsPages: {
    list: {
      title: string;
    };
    add: {
      title: string;
      scenePart: {
        title: string;
        addNewSceneBtn: string;
        addSceneBtn: string;
        editSceneBtn: string;
        form: {
          title: string;
          editSceneTitle: string;
        };
      };
      dialogForm: {
        title: string;
        dialogsInScene: {
          title: string;
          character: string;
          text: string;
        };
        characterFormTitle: string;
        PreviewTooltip: string;
        addDialogBtn: string;
        addNewDialogBtn: string;
        editDialogBtn: string;
      };
      charactersOnScreen: {
        list: {
          character: string;
        };
        form: {
          PreviewTooltip: string;
          editCharBtn: string;
          addCharBtn: string;
          addNewCharBtn: string;
        };
      };
      metaData: {
        description: string;
        imageAlt: string;
        title: string;
      };
    };
  };
  notFoundPage: {
    title: string;
    goToMainPageBtn: string;
    metaData: {
      description: string;
      imageAlt: string;
    };
  };
}
