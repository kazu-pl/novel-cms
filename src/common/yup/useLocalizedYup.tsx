import * as yup from "yup";
import { useTranslation } from "react-i18next";

export type Yup = typeof yup;

export function useLocalizedYup() {
  const { t } = useTranslation();

  yup.setLocale({
    mixed: {
      required: t("form.requiredFieldInputMsg"),
    },
    number: {
      min: (props) => `${t("form.number.min")} ${props.min}`,
      max: (props) => `${t("form.number.max")} ${props.max}`,
    },
    string: {
      email: t("form.wrongEmailMsg"),
    },
  });

  return yup;
}
