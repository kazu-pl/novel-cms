import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import HelmetDecorator from "components/HelmetDecorator";
import Table, { SortDirection } from "novel-ui/lib/Table";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import {
  fetchActs,
  removeAct,
  selectActs,
  fetchActsDictionary,
  selectActDictionary,
} from "features/act/store/actSlice";
import useLocalizedPath from "common/router/useLocalizedPath";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { useState, useCallback, useEffect } from "react";
import usePaginationSearchParams from "common/router/usePaginationSearchParams";
import { SuccessfulReqMsg } from "types/novel-server.types";
import { PATHS_ACT } from "common/constants/paths";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "novel-ui/lib/buttons/Button";
import ActionModal from "components/ActionModal";

const ActList = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const acts = useAppSelector(selectActs);
  const actsDisctionary = useAppSelector(selectActDictionary);
  const { path } = useLocalizedPath();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [actToRemoveModalData, setActToRemoveModalData] = useState({
    isOpen: false,
    id: "",
    name: "",
  });

  const [searchParams, setSearchParams] =
    usePaginationSearchParams<SortDirection>({
      currentPage: 1,
      pageSize: 5,
      sortDirection: "asc",
      sortBy: "createdAt",
    });

  const handleOnChangePage = (page: number) => {
    setSearchParams({ currentPage: page });
  };

  const onChangeRowsPerPage = (rowsPerPage: number) => {
    setSearchParams({ pageSize: rowsPerPage });
  };

  const onChangeSort = (sortingProperty: string, direction: SortDirection) => {
    setSearchParams({ sortBy: sortingProperty, sortDirection: direction });
  };

  const fetchData = useCallback(async () => {
    try {
      await dispatch(
        fetchActs({
          currentPage: searchParams.currentPage,
          pageSize: searchParams.pageSize,
          sortBy: searchParams.sortBy,
          sortDirection: searchParams.sortDirection,
        })
      );
    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: "error",
      });
    }
  }, [
    dispatch,
    searchParams.sortBy,
    searchParams.sortDirection,
    searchParams.pageSize,
    searchParams.currentPage,
    enqueueSnackbar,
  ]);

  useEffect(() => {
    fetchData();
    dispatch(fetchActsDictionary());
  }, [dispatch, fetchData]);

  const handleDeleteAct = async (id: string) => {
    try {
      const response = await dispatch(removeAct(id));
      const payload = response.payload as SuccessfulReqMsg;
      setActToRemoveModalData({
        id: "",
        isOpen: false,
        name: "",
      });
      enqueueSnackbar(payload.message, {
        variant: "info",
      });

      fetchData();
    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <HelmetDecorator
        description={t("actsPages.list.metaData.description")}
        imageAlt={t("actsPages.list.metaData.imageAlt")}
        imageUrl="https://media.istockphoto.com/photos/books-picture-id949118068?s=612x612"
        lang={i18n.language}
        title={t("actsPages.list.metaData.title")}
      />
      <DashboardLayoutWrapper title={t("actsPages.list.title")}>
        <Table
          isLoading={acts.isFetching}
          data={acts.data}
          tableName={t("actsPages.list.table.title")}
          pagination={{
            currentPage: searchParams.currentPage,
            pageSize: searchParams.pageSize,
            totalItems: acts.totalItems,
          }}
          sort={{
            sortBy: searchParams.sortBy,
            sortDirection: searchParams.sortDirection,
          }}
          onChangePage={handleOnChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onChangeSort={onChangeSort}
          columns={[
            {
              title: t("actsPages.list.table.columns.title"),
              key: "title",
              render: (row) => row.title,
              isSortable: true,
            },
            {
              title: t("actsPages.list.table.columns.description"),
              key: "description",
              render: (row) =>
                row.description.length > 50
                  ? `${row.description.slice(0, 50)}...`
                  : row.description,
              isSortable: true,
            },
            {
              title: t("actsPages.list.table.columns.scenesTotal"),
              key: "scenes",
              render: (row) => row.scenes.length,
            },
            {
              title: t("actsPages.list.table.columns.nextAct"),
              key: "nextAct",
              render: (row) =>
                !!row.nextAct
                  ? actsDisctionary?.find((item) => item.id === row.nextAct)
                      ?.title
                  : "",
            },
            {
              title: t("actsPages.list.table.columns.createdAt"),
              key: "createdAt",
              render: (row) => new Date(row.createdAt).toLocaleString(),
              isSortable: true,
            },
            {
              title: t("actsPages.list.table.columns.type"),
              key: "type",
              render: (row) => row.type,
            },
            {
              title: t("actsPages.list.table.columns.actions"),
              key: "actions",
              noWrap: true,
              render: (row) => (
                <Box display="flex">
                  <IconButton
                    onClick={() => navigate(path(PATHS_ACT.EDIT(row._id)))}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() =>
                      setActToRemoveModalData((prev) => ({
                        ...prev,
                        id: row._id,
                        isOpen: true,
                        name: row.title,
                      }))
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ),
            },
          ]}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button to={path(PATHS_ACT.ADD)} variant="contained">
            {t("buttons.add")}
          </Button>
        </Box>
      </DashboardLayoutWrapper>

      <ActionModal
        headlineText={t("actsPages.list.modal.headlineText")}
        open={actToRemoveModalData.isOpen}
        onClose={() =>
          setActToRemoveModalData({ isOpen: false, name: "", id: "" })
        }
        onActionBtnClickPromise={() => handleDeleteAct(actToRemoveModalData.id)}
        preChildrenTitle={{
          preTitle: t("actsPages.list.modal.sceneryPretitle"),
          title: actToRemoveModalData.name,
        }}
      >
        {t("actsPages.list.modal.text")}
      </ActionModal>
    </>
  );
};

export default ActList;
