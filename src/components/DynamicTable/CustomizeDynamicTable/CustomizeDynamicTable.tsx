import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "novel-ui/lib/buttons/Button";
import CustomizeDynamicTableOverlay, {
  CustomizeDynamicTableOverlayProps,
  CustomizedColumnFromStore,
} from "./Components/CustomizeDynamicTableOverlay";
import Menu from "@mui/material/Menu";
import { useTranslation } from "react-i18next";

export type { CustomizedColumnFromStore };

export interface CustomizeDynamicTableProps
  extends Omit<CustomizeDynamicTableOverlayProps, "setIsOverlayVisible"> {
  /**
   * Pass here fetching state of all fields you use to generate dynamic columns in table. This prop renders loading button instead of actuall dropdown until custom fields are fetched. It's to prevent dropdown from and re-rendering couple of times after downloaded fields when user already opened it.
   */
  isCustomColumnsLoading: boolean;
}

const CustomizeDynamicTable = ({
  isCustomColumnsLoading,
  ...rest
}: CustomizeDynamicTableProps) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isCustomColumnsLoading) {
    return (
      <Button startIcon={<SettingsIcon />} disabled>
        {t("loading")}...
      </Button>
    );
  }

  return (
    <>
      <Button startIcon={<SettingsIcon />} onClick={handleClick}>
        {t("customizeTable")}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <CustomizeDynamicTableOverlay
          setIsOverlayVisible={handleClose}
          {...rest}
        />
      </Menu>
    </>
  );
};

export default CustomizeDynamicTable;
