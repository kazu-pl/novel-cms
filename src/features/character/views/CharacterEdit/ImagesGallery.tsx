import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useAppSelector } from "common/store/hooks";
import { selectSingleCharacterData } from "features/character/store/characterSlice";
import { API_URL } from "common/constants/env";
import Box from "@mui/system/Box";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface ImagesGalleryProps {
  onDeleteIconClick: (filename: string) => void;
}

const ImagesGallery = ({ onDeleteIconClick }: ImagesGalleryProps) => {
  const character = useAppSelector(selectSingleCharacterData);
  const { t } = useTranslation();

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
                onClick={() => onDeleteIconClick(item.filename)}
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
