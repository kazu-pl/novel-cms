import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Dialog } from "types/novel-server.types";
import { useTranslation } from "react-i18next";

export interface DialogListItemProps {
  index: number;
  dialog: Dialog;
  onDeleteIconClick: IconButtonProps["onClick"];
  onEditIconClick: IconButtonProps["onClick"];
  onSeePreviewIconClick: IconButtonProps["onClick"];
}

const DialogListItem = ({
  index,
  dialog,
  onDeleteIconClick,
  onEditIconClick,
  onSeePreviewIconClick,
}: DialogListItemProps) => {
  const { t } = useTranslation();
  return (
    <Box
      key={index}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={1}
      boxShadow={1}
    >
      <Box display="flex" alignItems="center">
        <Typography>
          {t("actsPages.add.dialogForm.dialogsInScene.character")}:
          <span style={{ fontWeight: 500 }}>{dialog.characterSayingText}</span>
        </Typography>
        <Box ml={2} mr={2}>
          <Typography>
            {t("actsPages.add.dialogForm.dialogsInScene.text")}:{" "}
            {dialog.text.length > 55
              ? `${dialog.text.slice(0, 55)}...`
              : dialog.text}
          </Typography>
        </Box>
      </Box>
      <Box display="flex">
        <IconButton onClick={onSeePreviewIconClick}>
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={onEditIconClick}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDeleteIconClick}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DialogListItem;
