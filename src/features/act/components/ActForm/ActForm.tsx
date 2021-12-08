import { Act, SingleActDictionaryObject } from "types/novel-server.types";
import { Formik, Form, FieldArray, FormikHelpers } from "formik";
import { createSceneValidationSchema } from "./ActScenes/NewSceneForm";
import { useLocalizedYup } from "common/yup";
import { Box } from "@mui/system";
import TextFieldFormik from "novel-ui/lib/formik/TextFieldFormik";
import { MenuItem } from "@mui/material";
import ActScenes from "./ActScenes";
import Button from "novel-ui/lib/buttons/Button";
import { useTranslation } from "react-i18next";

export interface ActFormProps {
  initialValues: Act;
  actDictionary: SingleActDictionaryObject[];
  onSubmit: (values: Act, helpers: FormikHelpers<Act>) => void;
  submitButtonLabel: string;
  /**
   * When you edit some act, you can pass its `id` to prop `disallowedActIdToSelectAsNextAct` to prevent showing that act in select with list of `nextAct` acts. It will allow you to prevent chosing act A* as next act of the same act A*. So it prevents infinite loop of acts.
   *
   * * - act A is just an example of any Act.
   */
  disallowedActIdToSelectAsNextAct?: string;
}

const ActForm = ({
  initialValues,
  actDictionary,
  onSubmit,
  submitButtonLabel,
  disallowedActIdToSelectAsNextAct,
}: ActFormProps) => {
  const yup = useLocalizedYup();
  const { t } = useTranslation();

  const validationSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    nextAct: yup.string(),
    type: yup
      .string()
      .oneOf(
        ["start", "normal", "end"] as Act["type"][],
        "Start | normal | end"
      )
      .required(),
    scenes: yup.array().of(createSceneValidationSchema(yup)).required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Box maxWidth={700} width="100%">
            <Box mb={2}>
              <TextFieldFormik
                name="title"
                type="text"
                id="title"
                label={t("form.enterTitle")}
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <TextFieldFormik
                name="description"
                type="text"
                id="description"
                label={t("form.enterDescription")}
                fullWidth
              />
            </Box>

            <Box mb={2}>
              <TextFieldFormik
                name="type"
                select
                id="type"
                fullWidth
                label={t("actsPages.add.actForm.type")}
              >
                {(["start", "normal", "end"] as Act["type"][]).map(
                  (item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  )
                )}
              </TextFieldFormik>
            </Box>

            {actDictionary && (
              <Box mb={2}>
                <TextFieldFormik
                  name="nextAct"
                  select
                  clearable
                  id="nextAct"
                  fullWidth
                  label={t("actsPages.add.actForm.nextAct")}
                >
                  {disallowedActIdToSelectAsNextAct
                    ? actDictionary
                        .filter(
                          ({ id }) => id !== disallowedActIdToSelectAsNextAct
                        )
                        .map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.title}
                          </MenuItem>
                        ))
                    : actDictionary.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.title}
                        </MenuItem>
                      ))}
                </TextFieldFormik>
              </Box>
            )}
          </Box>
          <FieldArray
            name="scenes"
            render={(props) => <ActScenes {...props} />}
          />
          <Box maxWidth={700} width="100%">
            <Box mt={2} width="100%" display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                isLoading={isSubmitting}
              >
                {submitButtonLabel}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ActForm;
