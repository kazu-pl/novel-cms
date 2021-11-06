import NovelActionModal, {
  ActionModalProps as NovelActionModalProps,
} from "novel-ui/lib/modals/ActionModal";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export interface ActionModalProps
  extends Omit<NovelActionModalProps, "actionBtnText" | "closeBtnText"> {
  preChildrenTitle?: {
    preTitle: string;
    title: string;
  };
}

const ActionModal = ({
  color,
  preChildrenTitle,
  children,
  ...rest
}: ActionModalProps) => {
  const { t } = useTranslation();
  return (
    <NovelActionModal
      actionBtnText={t("buttons.submit")}
      closeBtnText={t("buttons.cancel")}
      color={color || "error"}
      {...rest}
    >
      <>
        {preChildrenTitle && (
          <Box pb={2}>
            <Typography>
              {preChildrenTitle.preTitle}
              <Typography component="span" fontWeight={500}>
                {preChildrenTitle.title}
              </Typography>
            </Typography>
          </Box>
        )}
        {children}
      </>
    </NovelActionModal>
  );
};

export default ActionModal;
