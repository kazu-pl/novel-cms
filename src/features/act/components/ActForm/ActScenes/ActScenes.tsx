import { FieldArray, FieldArrayRenderProps } from "formik";
import { useState } from "react";
import { Act } from "types/novel-server.types";
import NewSceneForm from "./NewSceneForm";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "novel-ui/lib/buttons/Button";
import { useTranslation } from "react-i18next";
import SceneListItem from "./SceneListItem";
import ActionModal from "components/ActionModal";

interface SceneToRemoveModalData {
  isOpen: boolean;
  remove: (index: number) => void;
  name: string;
  index: number | null;
}

export interface ActSceneFormProps extends FieldArrayRenderProps {}

const ActScenes = ({ name, push, form, remove }: ActSceneFormProps) => {
  const [isNewSceneFormShown, setIsNewsceneFormShown] = useState(false);
  const { t } = useTranslation();
  const handleHideForm = () => setIsNewsceneFormShown(false);

  const [sceneToRemoveModalData, setSceneToRemoveModalData] =
    useState<SceneToRemoveModalData>({
      isOpen: false,
      remove: () => {},
      name: "",
      index: null,
    });

  return (
    <>
      <Box
        mt={1}
        mb={1}
        border="1px solid rgba(0,0,0,0.2)"
        borderRadius={1}
        p={2}
      >
        <Box mt={1}>
          <Typography> {t("actsPages.add.scenePart.title")}</Typography>
        </Box>

        {Array.isArray((form.values as Act).scenes) && (
          <FieldArray
            name="scenes"
            render={(props) => (
              <>
                {(form.values as Act).scenes.map((scene, sceneIndex) => (
                  <SceneListItem
                    index={sceneIndex}
                    onRemoveIconClick={(e) => {
                      setSceneToRemoveModalData({
                        index: sceneIndex,
                        isOpen: true,
                        name: scene.title,
                        remove: props.remove,
                      });
                    }}
                    scene={scene}
                    onEditFormSubmit={props.replace}
                    key={scene.title}
                  />
                ))}
              </>
            )}
          />
        )}

        {isNewSceneFormShown && (
          <NewSceneForm
            btnLabel={t("actsPages.add.scenePart.addSceneBtn")}
            onSubmit={push}
            hideForm={handleHideForm}
            initialValues={{
              bgImg: {
                sceneryId: "",
                link: "",
              },
              title: "",
              dialogs: [],
            }}
          />
        )}

        {!isNewSceneFormShown && (
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              onClick={() => setIsNewsceneFormShown(true)}
              variant="contained"
            >
              {t("actsPages.add.scenePart.addNewSceneBtn")}
            </Button>
          </Box>
        )}
      </Box>
      <ActionModal
        headlineText={t("actsPages.add.scenePart.modal.headlineText")}
        open={sceneToRemoveModalData.isOpen}
        onClose={() =>
          setSceneToRemoveModalData((prev) => ({
            ...prev,
            isOpen: false,
            name: "",
          }))
        }
        onActionBtnClick={() => {
          sceneToRemoveModalData.index !== null &&
            sceneToRemoveModalData.remove(sceneToRemoveModalData.index);
          setSceneToRemoveModalData((prev) => ({
            ...prev,
            isOpen: false,
            name: "",
          }));
        }}
        preChildrenTitle={{
          preTitle: t("actsPages.add.scenePart.modal.sceneryPretitle"),
          title: sceneToRemoveModalData.name,
        }}
      >
        {t("actsPages.add.scenePart.modal.text")}
      </ActionModal>
    </>
  );
};

export default ActScenes;
