import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import {
  selectSingleCharacter,
  deleteCharacterImage,
  fetchSingleCharacter,
} from "features/character/store/characterSlice";
import { API_URL } from "common/constants/env";
import Box from "@mui/system/Box";
import { useParams } from "react-router";
import { SuccessfulReqMsg } from "types/novel-server.types";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";

const ImagesGallery = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const character = useAppSelector(selectSingleCharacter);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (filename: string) => {
    try {
      const response = await dispatch(
        deleteCharacterImage({ imageFilename: filename, characterId: id })
      );
      const payload = response.payload as SuccessfulReqMsg;
      enqueueSnackbar(payload.message, {
        variant: "info",
      });
      dispatch(fetchSingleCharacter(id));
    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: "error",
      });
    }
  };

  return (
    <Box display="flex" flexWrap="wrap">
      {character?.imagesList?.length === 0 && (
        <Typography variant="overline">
          {t("CharacterPages.edit.noImagesInGallery")}
        </Typography>
      )}
      {character?.imagesList.map((item) => (
        <Card sx={{ flexGrow: 1, m: 1 }} key={item.filename}>
          <CardHeader
            action={
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(item.filename)}
              >
                <DeleteIcon />
              </IconButton>
            }
            title={
              item.filename.length > 30
                ? `${item.filename.slice(0, 30)}...`
                : item.filename
            }
            titleTypographyProps={{
              variant: "body2",
            }}
            subheader={
              item.originalName.length > 30
                ? `${item.originalName.slice(0, 30)}...`
                : item.originalName
            }
          />
          <CardMedia
            component="img"
            height="194"
            image={`${API_URL + item.url}`}
            alt={item.filename}
          />
        </Card>
      ))}
    </Box>
  );
};

export default ImagesGallery;
