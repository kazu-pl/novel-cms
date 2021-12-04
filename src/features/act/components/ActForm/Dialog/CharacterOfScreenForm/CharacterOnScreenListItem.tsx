import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CharacterOnScreen } from "types/novel-server.types";
import { useTranslation } from "react-i18next";

export interface CharacterOnScreenListItemProps {
  index: number;
  character: CharacterOnScreen;
  onEditIconClick: IconButtonProps["onClick"];
  onRemoveIconClick: IconButtonProps["onClick"];
}

const CharacterOnScreenListItem = ({
  index,
  character,
  onEditIconClick,
  onRemoveIconClick,
}: CharacterOnScreenListItemProps) => {
  const { t } = useTranslation();
  return (
    <Box
      key={index}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={1}
      boxShadow={1}
      mb={2}
    >
      <Box display="flex" alignItems="center">
        <Typography>
          {t("actsPages.add.charactersOnScreen.list.character")}:{" "}
          <span style={{ fontWeight: 500 }}>{character.name}</span>
        </Typography>
        <Box ml={2} mr={2}>
          <Typography>zIndex: {character.zIndex}</Typography>
        </Box>
        <Typography>left: {character.leftPosition}%</Typography>
      </Box>
      <Box display="flex">
        <IconButton onClick={onEditIconClick}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onRemoveIconClick}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CharacterOnScreenListItem;
