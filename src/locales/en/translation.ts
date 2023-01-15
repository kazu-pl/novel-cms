import { Translation } from "../Translation";

const en: Translation = {
  title: "Title",
  description: "Description",
  loading: "Loading",
  customizeTable: "Customize table",
  search: "Search",
  default: "Default",
  fixedColumnWarning: "Cannot change order of fixed column",
  notifications: {
    sessionEnd: "Session ended. login to go to the previous page",
  },
  cancelNotifications: {
    login: "Login action aborted",
  },
  graphs: {
    charactersImagesCounter: "Number of photos of individual characters",
    sceneriesImagesCounter: "Number of photos of individual sceneries",
    actScenesAmount: "Number of scenes of individual acts",
    actDialogsAmount: "Number of dialogs of individual acts",
    imagesAmount: "Images amount",
    scenesAmount: "Scenes amount",
    dialogsAmount: "Dialogs amount",
  },
  form: {
    rememberMe: "Remember me",
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
    selectAll: "Select all",
    edit: "Edit",
    pasteBtnsCombination:
      "If you want to edit data press CTRL + V to open modal or click the button",
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
      items: { list: "Act list", add: "Add new act" },
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
    list: {
      title: "Act List",
      table: {
        title: "Acts",
        columns: {
          title: "Title",
          description: "description",
          scenesTotal: "Total scenes",
          nextAct: "Next Act Id",
          createdAt: "createdAt",
          type: "type",
          actions: "Actions",
        },
      },
      modal: {
        headlineText: "Deleting act",
        sceneryPretitle: "Act to delete: ",
        text: "Are you sure you want to delete this Act? This can't be undone later.",
      },
      metaData: {
        description: "Act List",
        imageAlt: "Act List",
        title: "Act List",
      },
    },
    add: {
      title: "Add new act",
      actForm: {
        type: "Act type",
        nextAct: "Next Act",
      },
      scenePart: {
        title: "Scenes",
        addNewSceneBtn: "Add new scene",
        addSceneBtn: "Add scene",
        editSceneBtn: "Edit scene",
        form: {
          title: "Add new scene",
          editSceneTitle: "You're editing scene",
          selectSceneryId: "Select scenery",
          selectSceneryBg: "Select scenery background",
        },
        modal: {
          headlineText: "Delete scene",
          sceneryPretitle: "Scene: ",
          text: "Are you sure you want to delete this scene? Remember that if you are deleting the scene from already existing Akt then you're deleting it from the temporary memory of the act. To completely delete the scene, update the Act",
        },
      },
      dialogForm: {
        title: "Dialogs",
        characterSayingText: "Speaker",
        text: "text",
        dialogsInScene: {
          title: "Dialogs in this scene",
          character: "Character",
          text: "Text",
        },
        modal: {
          title: "Delete dialog",
          speaker: "Speaker",
          text: "Text",
          info: `Are you sure you want to delete dialog? By submiting you will delete it only from editing act memory. Remember you must update Scene and Act to really delete this dialog.`,
        },
        characterFormTitle: "Characters",
        PreviewTooltip: "Click to see dialog on preview window",
        putInQuoteTooltip: `Add quotes " " `,
        addDialogBtn: "Add dialog",
        addNewDialogBtn: "Add new dialog",
        editDialogBtn: "Edit dialog",
      },
      charactersOnScreen: {
        list: {
          character: "Character",
        },
        form: {
          characterName: "Character",
          PreviewTooltip: "Click to see characters on preview",
          copyFromPrev: "Copy characters from previous dialog",
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
    edit: {
      title: "Edit Act",
      metaData: {
        description: "Edit Act",
        imageAlt: "img alt",
        title: "Edit Act",
      },
    },
  },
  filesPages: {
    common: {
      fullScreenTooltip: "See on full screen",
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
