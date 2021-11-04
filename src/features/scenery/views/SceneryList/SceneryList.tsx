import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import Button from "novel-ui/lib/buttons/Button";
import { PATHS_SCENERY } from "common/constants/paths";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import { useEffect } from "react";
import {
  fetchSceneries,
  selectSceneries,
  removeScenery,
} from "features/scenery/store/scenerySlice";
import { useCallback } from "react";
import Table from "novel-ui/lib/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import useLocalizedPath from "common/router/useLocalizedPath";
import { useHistory } from "react-router-dom";
import { SuccessfulReqMsg } from "types/novel-server.types";

const SceneryList = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const sceneries = useAppSelector(selectSceneries);
  const { path } = useLocalizedPath();
  const history = useHistory();

  const fetchData = useCallback(async () => {
    try {
      await dispatch(fetchSceneries());
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteScenery = async (id: string) => {
    try {
      const response = await dispatch(removeScenery(id));
      const payload = response.payload as SuccessfulReqMsg;
      alert(payload.message);
      fetchData();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <HelmetDecorator
        description={t("SceneryPages.list.metaData.descrption")}
        imageAlt={t("SceneryPages.list.metaData.imageAlt")}
        imageUrl="https://media.istockphoto.com/photos/books-picture-id949118068?s=612x612"
        lang={i18n.language}
        title={t("SceneryPages.list.metaData.title")}
      />
      <DashboardLayoutWrapper title={t("SceneryPages.list.title")}>
        <Table
          data={sceneries}
          tableName={t("SceneryPages.list.table.title")}
          columns={[
            {
              title: t("SceneryPages.list.table.columns.title"),
              key: "title",
              render: (row) => row.title,
            },
            {
              title: t("SceneryPages.list.table.columns.description"),
              key: "description",
              render: (row) => row.description,
            },
            {
              title: t("SceneryPages.list.table.columns.total"),
              key: "totalImages",
              render: (row) => row.imagesList.length,
            },
            {
              title: t("SceneryPages.list.table.columns.actions"),
              key: "actions",
              noWrap: true,
              render: (row) => (
                <Box display="flex">
                  <IconButton
                    onClick={() =>
                      history.push(path(PATHS_SCENERY.EDIT(row._id)))
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteScenery(row._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ),
            },
          ]}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button to={path(PATHS_SCENERY.ADD)} variant="contained">
            {t("buttons.add")}
          </Button>
        </Box>
      </DashboardLayoutWrapper>
    </>
  );
};

export default SceneryList;
