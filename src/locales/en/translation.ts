import { Translation } from "../Translation";

const en: Translation = {
  notifications: {
    sessionEnd: "Session ended. login to go to the previous page",
  },
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
    number: {
      min: "min allowed value is:",
      max: "max allowed value is:",
    },
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
    acts: {
      title: "Acts",
      items: {
        add: "Add new act",
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
      modal: {
        headlineText: "Deleting scenery",
        sceneryPretitle: "Scenery to delete: ",
        text: "Are you sure you want to delete the scenery? This can't be undone later.",
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
      modal: {
        headlineText: "Deleting scenery image",
        sceneryPretitle: "Bild zum Löschen: ",
        text: "Möchten Sie dieses Bild wirklich löschen? Dies kann später nicht mehr rückgängig gemacht werden.",
      },
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
      modal: {
        headlineText: "Delete character",
        sceneryPretitle: "character to delete: ",
        text: "Are you sure you want to delete this character? This can't be undone later.",
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
      modal: {
        headlineText: "Deleting character image",
        sceneryPretitle: "Image to delete: ",
        text: "Are you sure you want to delete this image? This can't be undone later.",
      },
      metaData: {
        description: "This is a page to manage characters",
        imageAlt: "image alt",
        title: "Edit character",
      },
    },
  },
  actsPages: {
    add: {
      title: "Add new act",
      scenePart: {
        title: "Scenes",
        addNewSceneBtn: "Add new scene",
        addSceneBtn: "Add scene",
        editSceneBtn: "Edit scene",
        form: {
          title: "Add new scene",
          editSceneTitle: "You're editing scene",
        },
      },
      dialogForm: {
        title: "Dialogs",
        dialogsInScene: {
          title: "Dialogs in this scene",
          character: "Character",
          text: "Text",
        },
        characterFormTitle: "Characters",
        PreviewTooltip: "Click to see dialog on preview window",
        addDialogBtn: "Add dialog",
        addNewDialogBtn: "Add new dialog",
        editDialogBtn: "Edit dialog",
      },
      charactersOnScreen: {
        list: {
          character: "Character",
        },
        form: {
          PreviewTooltip: "Click to see characters on preview",
          editCharBtn: "Edit character",
          addCharBtn: "Ad character",
          addNewCharBtn: "Add new character",
        },
      },
      metaData: {
        description: "Game story acts",
        imageAlt: "image alt",
        title: "Acts",
      },
    },
  },
  notFoundPage: {
    title: "Not found",
    goToMainPageBtn: "Go to dashbaord",
    metaData: {
      description: "Not found",
      imageAlt: "Not found",
    },
  },
};

export default en;
