import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useAppSelector } from "common/store/hooks";
import { selectSingleSceneryData } from "features/scenery/store/scenerySlice";
import { API_URL } from "common/constants/env";
import Box from "@mui/system/Box";
import { Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { PATHS_FILES } from "common/constants/paths";

export interface ImagesGalleryProps {
  onDeleteIconClick: (filename: string) => void;
}

const ImagesGallery = ({ onDeleteIconClick }: ImagesGalleryProps) => {
  const scenery = useAppSelector(selectSingleSceneryData);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box display="flex" flexWrap="wrap">
      {scenery?.imagesList?.length === 0 && (
        <Typography variant="overline">
          {t("SceneryPages.edit.noImagesInGallery")}
        </Typography>
      )}
      {scenery?.imagesList.map((item) => (
        <Card sx={{ width: "100%", m: 1 }} key={item.filename}>
          <CardHeader
            action={
              <>
                <IconButton
                  aria-label="delete"
                  onClick={() => onDeleteIconClick(item.filename)}
                >
                  <DeleteIcon />
                </IconButton>
                <Tooltip
                  title={t("filesPages.common.fullScreenTooltip") as string}
                >
                  <IconButton
                    onClick={() => navigate(PATHS_FILES.FILES(item.filename))}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </>
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
            sx={{
              maxHeight: 400,
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Card>
      ))}
    </Box>
  );
};

export default ImagesGallery;
