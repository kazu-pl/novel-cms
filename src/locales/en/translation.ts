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
    enterTitle: "enter title",
    enterDescription: "enter description",
  },
  buttons: {
    add: "add",
    submit: "Submit",
    cancel: "Cancel",
    update: "Update",
    delete: "Delete",
    selectFile: "Select file",
  },
  dashboardSidebarItems: {
    dashboard: "Dashboard",
    account: "account",
    scenery: {
      title: "sceneries",
      items: {
        list: "sceneries list",
        add: "add new scenery",
      },
    },
    character: {
      title: "Characters",
      items: {
        list: "List of characters",
        add: "Add new character",
      },
    },
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
  SceneryPages: {
    list: {
      title: "Scenery list",
      table: {
        title: "list of sceneries",
        columns: {
          title: "title",
          description: "description",
          total: "total images",
          actions: "actions",
          createdAt: "created at",
        },
      },
      metaData: {
        description: "Page with scenery list",
        imageAlt: "image alt",
        title: "Scenery List",
      },
    },
    add: {
      title: "Add new scenery",
      metaData: {
        description: "Add new scenery page",
        imageAlt: "image alt",
        title: "Add Scenery",
      },
    },
    edit: {
      title: "Edit scenery",
      basicDataFormTitle: "Edit basic data",
      newImagesTitle: "Add new images",
      imagesGalleryTitle: "Gallery",
      noImagesInGallery: "No images",
      metaData: {
        description: "This is a page to manage sceneries",
        imageAlt: "image alt",
        title: "Edit scenery",
      },
    },
  },
  CharacterPages: {
    list: {
      title: "character list",
      table: {
        title: "list of characters",
        columns: {
          title: "title",
          description: "description",
          total: "total images",
          actions: "actions",
          createdAt: "created at",
        },
      },
      metaData: {
        description: "Page with character list",
        imageAlt: "image alt",
        title: "character List",
      },
    },
    add: {
      title: "Add new character",
      metaData: {
        description: "Add new character page",
        imageAlt: "image alt",
        title: "Add character",
      },
    },
    edit: {
      title: "Edit character",
      basicDataFormTitle: "Edit basic data",
      newImagesTitle: "Add new images",
      imagesGalleryTitle: "Gallery",
      noImagesInGallery: "No images",
      metaData: {
        description: "This is a page to manage characters",
        imageAlt: "image alt",
        title: "Edit character",
      },
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
