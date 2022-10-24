import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import Button from "novel-ui/lib/buttons/Button";
import { PATHS_CHARACTER } from "common/constants/paths";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import { useEffect, useMemo, useState } from "react";
import {
  fetchCharacters,
  selectCharacters,
  removeCharacter,
} from "features/character/store/characterSlice";
import { useCallback } from "react";
import Table, { SortDirection } from "novel-ui/lib/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import useLocalizedPath from "common/router/useLocalizedPath";
import { useNavigate } from "react-router-dom";
import { Character, SuccessfulReqMsg } from "types/novel-server.types";
import usePaginationSearchParams from "common/router/usePaginationSearchParams";
import { useSnackbar } from "notistack";
import ActionModal from "components/ActionModal";
import TextField from "novel-ui/lib/inputs/TextField";
import debounce from "lodash.debounce";
import Highlighter from "react-highlight-words";
import renderMaxLengthText from "components/DynamicTable/utils/renderMaxLengthText";

const SceneryList = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);
  const { path } = useLocalizedPath();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [characterToRemoveModalData, setCharacterToRemoveModalData] = useState({
    isOpen: false,
    id: "",
    name: "",
  });

  const [searchParams, setSearchParams] = usePaginationSearchParams({
    currentPage: 1,
    pageSize: 5,
    sortDirection: "asc",
    sortBy: "createdAt",
    search: "",
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
        fetchCharacters({
          currentPage: searchParams.currentPage,
          pageSize: searchParams.pageSize,
          sortBy: searchParams.sortBy,
          sortDirection: searchParams.sortDirection,
          search: searchParams.search,
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
    searchParams.search,
    enqueueSnackbar,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteScenery = async (id: string) => {
    try {
      const response = await dispatch(removeCharacter(id));
      const payload = response.payload as SuccessfulReqMsg;
      enqueueSnackbar(payload.message, {
        variant: "info",
      });
      setCharacterToRemoveModalData({
        id: "",
        isOpen: false,
        name: "",
      });
      fetchData();
    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: "error",
      });
    }
  };

  const debouncedSearchOnChangeHandler = useMemo(
    () =>
      debounce((event) => {
        setSearchParams({ search: event.target.value });
      }, 1000),
    [setSearchParams]
  );

  return (
    <>
      <HelmetDecorator
        description={t("CharacterPages.list.metaData.description")}
        imageAlt={t("CharacterPages.list.metaData.imageAlt")}
        imageUrl="https://media.istockphoto.com/photos/books-picture-id949118068?s=612x612"
        lang={i18n.language}
        title={t("CharacterPages.list.metaData.title")}
      />
      <DashboardLayoutWrapper title={t("CharacterPages.list.title")}>
        <Table
          isLoading={characters.isFetching}
          // data={characters.data}
          // for some reason I need to pass ` || ([] as Character[])` in order to make react-snap work
          data={characters.data || ([] as Character[])}
          tableName={t("CharacterPages.list.table.title")}
          pagination={{
            currentPage: searchParams.currentPage,
            pageSize: searchParams.pageSize,
            totalItems: characters.totalItems,
          }}
          sort={{
            sortBy: searchParams.sortBy,
            sortDirection: searchParams.sortDirection,
          }}
          onChangePage={handleOnChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onChangeSort={onChangeSort}
          filters={
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <TextField
                placeholder="search..."
                defaultValue={searchParams.search || ""}
                onChange={debouncedSearchOnChangeHandler}
                size="small"
              />
            </div>
          }
          isFiltersBarVisibleInitially={!!searchParams.search}
          columns={[
            {
              title: t("CharacterPages.list.table.columns.title"),
              key: "title",
              render: (row) => (
                <Highlighter
                  searchWords={[searchParams.search]}
                  textToHighlight={row.title}
                />
              ),
              isSortable: true,
            },
            {
              title: t("CharacterPages.list.table.columns.description"),
              key: "description",
              render: (row) => renderMaxLengthText(row.description, 100),
              isSortable: true,
            },
            {
              title: t("CharacterPages.list.table.columns.total"),
              key: "imagesList",
              render: (row) => row.imagesList.length,
              // isSortable: true,
            },
            {
              title: t("CharacterPages.list.table.columns.createdAt"),
              key: "createdAt",
              render: (row) => new Date(row.createdAt).toLocaleString(),
              isSortable: true,
            },
            {
              title: t("CharacterPages.list.table.columns.actions"),
              key: "actions",
              noWrap: true,
              render: (row) => (
                <Box display="flex">
                  <IconButton
                    onClick={() =>
                      navigate(path(PATHS_CHARACTER.EDIT(row._id)))
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      setCharacterToRemoveModalData((prev) => ({
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
          <Button to={path(PATHS_CHARACTER.ADD)} variant="contained">
            {t("buttons.add")}
          </Button>
        </Box>
      </DashboardLayoutWrapper>
      <ActionModal
        headlineText={t("CharacterPages.list.modal.headlineText")}
        open={characterToRemoveModalData.isOpen}
        onClose={() =>
          setCharacterToRemoveModalData({ isOpen: false, name: "", id: "" })
        }
        onActionBtnClickPromise={() =>
          handleDeleteScenery(characterToRemoveModalData.id)
        }
        preChildrenTitle={{
          preTitle: t("CharacterPages.list.modal.sceneryPretitle"),
          title: characterToRemoveModalData.name,
        }}
      >
        {t("CharacterPages.list.modal.text")}
      </ActionModal>
    </>
  );
};

export default SceneryList;
