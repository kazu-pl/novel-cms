import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import Button from "novel-ui/lib/buttons/Button";
import { PATHS_CHARACTER } from "common/constants/paths";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import { useEffect } from "react";
import {
  fetchCharacters,
  selectCharacters,
  removeCharacter,
} from "features/character/store/characterSlice";
import { useCallback } from "react";
import Table from "novel-ui/lib/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import useLocalizedPath from "common/router/useLocalizedPath";
import { useHistory } from "react-router-dom";
import { SuccessfulReqMsg } from "types/novel-server.types";
import usePaginationSearchParams from "common/router/usePaginationSearchParams";

type SortDirection = "asc" | "desc";

const SceneryList = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);
  const { path } = useLocalizedPath();
  const history = useHistory();

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
        fetchCharacters({
          currentPage: searchParams.currentPage,
          pageSize: searchParams.pageSize,
          sortBy: searchParams.sortBy,
          sortDirection: searchParams.sortDirection,
        })
      );
    } catch (error) {}
  }, [
    dispatch,
    searchParams.sortBy,
    searchParams.sortDirection,
    searchParams.pageSize,
    searchParams.currentPage,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteScenery = async (id: string) => {
    try {
      const response = await dispatch(removeCharacter(id));
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
        description={t("CharacterPages.list.metaData.description")}
        imageAlt={t("CharacterPages.list.metaData.imageAlt")}
        imageUrl="https://media.istockphoto.com/photos/books-picture-id949118068?s=612x612"
        lang={i18n.language}
        title={t("CharacterPages.list.metaData.title")}
      />
      <DashboardLayoutWrapper title={t("CharacterPages.list.title")}>
        <Table
          data={characters.data}
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
          columns={[
            {
              title: t("CharacterPages.list.table.columns.title"),
              key: "title",
              render: (row) => row.title,
              isSortable: true,
            },
            {
              title: t("CharacterPages.list.table.columns.description"),
              key: "description",
              render: (row) => row.description,
              isSortable: true,
            },
            {
              title: t("CharacterPages.list.table.columns.total"),
              key: "imagesList",
              render: (row) => row.imagesList.length,
              isSortable: true,
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
                      history.push(path(PATHS_CHARACTER.EDIT(row._id)))
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
          <Button to={path(PATHS_CHARACTER.ADD)} variant="contained">
            {t("buttons.add")}
          </Button>
        </Box>
      </DashboardLayoutWrapper>
    </>
  );
};

export default SceneryList;
