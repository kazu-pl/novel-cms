import { FieldArrayRenderProps } from "formik";
import { useState } from "react";
import { Scene, Act } from "types/novel-server.types";
import NewActForm from "./NewSceneForm";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "novel-ui/lib/buttons/Button";

export interface ActSceneFormProps extends FieldArrayRenderProps {}

const ActScenes = ({ name, push, form }: ActSceneFormProps) => {
  const [isNewSceneFormShown, setIsNewsceneFormShown] = useState(false);

  const handleHideForm = () => setIsNewsceneFormShown(false);

  return (
    <Box
      mt={1}
      mb={1}
      border="1px solid rgba(0,0,0,0.2)"
      borderRadius={1}
      p={2}
    >
      <Box mt={1} mb={1}>
        <Typography>Scenes</Typography>
      </Box>

      {Array.isArray((form.values as Act).scenes) &&
        ((form.values as Act).scenes as Scene[]).map((item, index) => (
          <div key={index}>
            <p>{item.title}</p>
          </div>
        ))}

      {isNewSceneFormShown && (
        <NewActForm
          btnLabel="dodaj nową scenę"
          pushNewScene={push}
          hideForm={handleHideForm}
        />
      )}

      {!isNewSceneFormShown && (
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={() => setIsNewsceneFormShown(true)}
            variant="contained"
          >
            Add new scene
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ActScenes;
