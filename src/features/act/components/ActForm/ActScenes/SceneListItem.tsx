import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Scene } from "types/novel-server.types";
import NewSceneForm from "./NewSceneForm";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface SceneItemProps {
  index: number;
  scene: Scene;
  onRemoveIconClick: (index: number) => void;
  onEditFormSubmit: (index: number, newValue: Scene) => void;
}

const SceneListItem = ({
  scene,
  index,
  onRemoveIconClick,
  onEditFormSubmit,
}: SceneItemProps) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column">
      {!isEditFormOpen && (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
          boxShadow={1}
          mt={2}
        >
          <Box display="flex" alignItems="center">
            <Box mr={2}>
              <Typography>
                Nr:
                <span style={{ fontWeight: 500 }}>{index + 1}</span>
              </Typography>
            </Box>
            <Typography>
              Scena: <span style={{ fontWeight: 500 }}>{scene.title}</span>
            </Typography>
            <Box ml={2} mr={2}>
              <Typography>
                ilość dialogów:{" "}
                <span style={{ fontWeight: 500 }}>{scene.dialogs.length}</span>
              </Typography>
            </Box>
            <Typography>
              Tło: <span style={{ fontWeight: 500 }}>{scene.bgImg.link}</span>
            </Typography>
          </Box>
          <Box display="flex">
            <IconButton
              onClick={() => {
                setIsEditFormOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onRemoveIconClick(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      {isEditFormOpen && (
        <Box mt={2}>
          <NewSceneForm
            btnLabel={t("actsPages.add.scenePart.editSceneBtn")}
            onSubmit={(values) => onEditFormSubmit(index, values)}
            hideForm={() => setIsEditFormOpen(false)}
            initialValues={scene}
            isInSceneEditMode={isEditFormOpen}
          />
        </Box>
      )}
    </Box>
  );
};

export default SceneListItem;
