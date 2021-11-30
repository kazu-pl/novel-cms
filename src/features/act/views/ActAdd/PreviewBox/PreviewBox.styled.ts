import styled from "styled-components";

export const StyledBgImg = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 16/9;
`;

export const StyledDialogTextWrapper = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  z-index: 100;
  transform: translateX(-50%);

  width: 60%;
  min-height: 25%;

  background-color: rgba(0, 0, 0, 0.5);
  filter: blur(0.5px);
  color: white;

  padding: 8px;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const StyledCharacterNameWrapper = styled.p`
  align-self: center;
`;

interface StyledCharacterImgProps {
  left: number;
  zIndex: number;
}

export const StyledCharacterImg = styled.img<StyledCharacterImgProps>`
  display: block;
  position: absolute;
  left: ${({ left }) => left}%;
  bottom: 2px;
  z-index: ${({ zIndex }) => zIndex};
  object-fit: cover;
  height: 80%;
  width: auto;
`;
