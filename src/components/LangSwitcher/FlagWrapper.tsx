import Box from "@mui/material/Box";

export interface FlagWrapperProps {
  src: string;
  alt: string;
}

const size = 25;

const FlagWrapper = ({ src, alt }: FlagWrapperProps) => {
  return (
    <Box
      width={size}
      height={size}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <img src={src} alt={alt} width={size} />
    </Box>
  );
};

export default FlagWrapper;
