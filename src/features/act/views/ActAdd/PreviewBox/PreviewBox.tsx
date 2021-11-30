import { Dialog } from "types/novel-server.types";
import {
  StyledBgImg,
  StyledDialogTextWrapper,
  StyledCharacterNameWrapper,
  StyledCharacterImg,
} from "./PreviewBox.styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { API_URL } from "common/constants/env";

export interface PreviewBoxProps extends Dialog {
  bgImgUrl: string;
}

const PreviewBox = ({
  bgImgUrl,
  text,
  characterSayingText,
  charactersOnScreen,
}: PreviewBoxProps) => {
  return (
    <Box position="relative" overflow="hidden">
      <StyledBgImg src={`${bgImgUrl}`} alt="preview background image" />
      {charactersOnScreen.map((character) => (
        <StyledCharacterImg
          src={API_URL + character.imgUrl}
          alt={character.name}
          left={character.leftPosition}
          zIndex={character.zIndex}
        />
      ))}

      <StyledDialogTextWrapper>
        <StyledCharacterNameWrapper>
          {characterSayingText}
        </StyledCharacterNameWrapper>
        <Typography variant="caption">{text}</Typography>
      </StyledDialogTextWrapper>
    </Box>
  );
};

export default PreviewBox;
