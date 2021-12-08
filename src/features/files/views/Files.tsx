import { PATHS_FILES } from "common/constants/paths";
import { useParams } from "react-router-dom";

const Files = () => {
  const params = useParams();
  const fileName = params.fileName as string;

  return (
    <div>
      <img
        src={PATHS_FILES.FILE_GET_API_LINK(fileName)}
        alt="404 - not found"
      />
    </div>
  );
};

export default Files;
