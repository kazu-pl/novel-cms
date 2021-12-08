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

  padding: 0 0px 8px 0px;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const StyledCharacterNameWrapper = styled.p`
  align-self: center;
  min-height: 24px;
  width: 100%;
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.25) 100%
  );
`;

export const StyledCharacterTextWrapper = styled.div`
  padding: 0 8px 8px 8px;
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
