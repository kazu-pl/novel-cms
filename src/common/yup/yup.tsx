import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "To pole jest wymagane",
  },
  string: {
    email: "Podaj poprawny email",
  },
});

export default yup;
