import * as yup from "yup";
import { useTranslation } from "react-i18next";

export function useLocalizedYup() {
  const { t } = useTranslation();

  yup.setLocale({
    mixed: {
      required: t("form.requiredFieldInputMsg"),
    },
    string: {
      email: t("form.wrongEmailMsg"),
    },
  });

  return yup;
}
