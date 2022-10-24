import DashboardLayoutWrapper from "common/wrappers/DashboardLayoutWrapper";
import { useTranslation } from "react-i18next";
import HelmetDecorator from "components/HelmetDecorator";
import Button from "novel-ui/lib/buttons/Button";
import { PATHS_SCENERY } from "common/constants/paths";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import { useEffect, useMemo, useState } from "react";
import {
  fetchSceneries,
  selectSceneries,
  removeScenery,
  selectSceneryTableInitialColumns,
  selectSceneryTableCurrentColumns,
  updateSceneryTableColumns,
} from "features/scenery/store/scenerySlice";
import { useCallback } from "react";
import { SortDirection } from "novel-ui/lib/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import useLocalizedPath from "common/router/useLocalizedPath";
import { useNavigate } from "react-router-dom";
import { Scenery, SuccessfulReqMsg } from "types/novel-server.types";
import usePaginationSearchParams from "common/router/usePaginationSearchParams";
import { useSnackbar } from "notistack";
import ActionModal from "components/ActionModal";
import TextField from "novel-ui/lib/inputs/TextField";
import debounce from "lodash.debounce";
import Highlighter from "react-highlight-words";
import DynamicTable, { DynamicTableColumn } from "components/DynamicTable";
import CustomizeDynamicTable, {
  CustomizedColumnFromStore,
} from "components/DynamicTable/CustomizeDynamicTable";
import renderMaxLengthText from "components/DynamicTable/utils/renderMaxLengthText";
import generateActiveColumnsToDisplay from "components/DynamicTable/utils/generateActiveColumnsToDisplay";
import generateCustomizeDynamicTableColumns from "components/DynamicTable/CustomizeDynamicTable/utils/generateCustomizeDynamicTableColumns";

const SceneryList = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const sceneries = useAppSelector(selectSceneries);
  const { path } = useLocalizedPath();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [sceneryToRemoveModalData, setSceneryToRemoveModalData] = useState({
    isOpen: false,
    id: "",
    name: "",
  });

  const [searchParams, setSearchParams] = usePaginationSearchParams(
    {
      currentPage: 1,
      pageSize: 5,
      sortDirection: "asc",
      sortBy: "createdAt",
      search: "",
    }
    // {
    // pushToInitialParamsOnFirstPageEnter: false
    // }
  );

  const initialTableColumns = useAppSelector(selectSceneryTableInitialColumns);

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
        fetchSceneries({
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
      const response = await dispatch(removeScenery(id));
      const payload = response.payload as SuccessfulReqMsg;
      setSceneryToRemoveModalData({
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

  const debouncedSearchOnChangeHandler = useMemo(
    () =>
      debounce((event) => {
        setSearchParams({ search: event.target.value });
      }, 1000),
    [setSearchParams]
  );

  /**
   * List of all columns that can be seen in the table. The actual visible columns are in redux. In this component, the currently visible ones are called `tableCurrentColumnsFromRedux`. Store keeps only `key`, `isActive and `isCustomColumn` props. You can't keep all cols in redux because there are functions like `render` which acan't be serialized (by default it can't be)
   */
  const allPossibleColumns: DynamicTableColumn<Scenery>[] = [
    {
      title: t("SceneryPages.list.table.columns.title"),
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
      title: t("SceneryPages.list.table.columns.description"),
      key: "description",
      render: (row) => renderMaxLengthText(row.description, 100),
      isSortable: true,
    },
    {
      title: t("SceneryPages.list.table.columns.total"),
      key: "imagesList",
      render: (row) => row.imagesList.length,
      // isSortable: true,
    },
    {
      title: t("SceneryPages.list.table.columns.createdAt"),
      key: "createdAt",
      render: (row) => new Date(row.createdAt).toLocaleString(),
      isSortable: true,
    },
    {
      title: t("SceneryPages.list.table.columns.actions"),
      key: "actions",
      noWrap: true,
      render: (row) => (
        <Box display="flex">
          <IconButton
            onClick={() => navigate(path(PATHS_SCENERY.EDIT(row._id)))}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={() =>
              setSceneryToRemoveModalData((prev) => ({
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
  ];

  /**
   * Redux stores current tables but only their `key` prop, `isActive` prop and optional `isCustomColumn` prop. List of all possible columns that can be passed to the table are here above, called `allPossibleColumns`
   */
  const tableCurrentColumnsFromRedux = useAppSelector(
    selectSceneryTableCurrentColumns
  );

  const handleSetColumns = (columns: CustomizedColumnFromStore[]) => {
    dispatch(updateSceneryTableColumns(columns));
  };

  const activeColumnsToDisplay = generateActiveColumnsToDisplay(
    tableCurrentColumnsFromRedux,
    allPossibleColumns
  );

  return (
    <>
      <HelmetDecorator
        description={t("SceneryPages.list.metaData.description")}
        imageAlt={t("SceneryPages.list.metaData.imageAlt")}
        imageUrl="https://media.istockphoto.com/photos/books-picture-id949118068?s=612x612"
        lang={i18n.language}
        title={t("SceneryPages.list.metaData.title")}
      />
      <DashboardLayoutWrapper
        title={t("SceneryPages.list.title")}
        additionalControls={
          <CustomizeDynamicTable
            isCustomColumnsLoading={sceneries.isFetching}
            setColumns={handleSetColumns}
            initialColumns={initialTableColumns}
            columns={generateCustomizeDynamicTableColumns(
              tableCurrentColumnsFromRedux,
              allPossibleColumns
            )}
          />
        }
      >
        <DynamicTable
          isLoading={sceneries.isFetching}
          // data={sceneries.data}
          // for some reason I need to pass ` || ([] as Scenery[])` in order to make react-snap work
          data={sceneries.data || ([] as Scenery[])}
          columns={activeColumnsToDisplay}
          tableName={t("SceneryPages.list.table.title")}
          pagination={{
            currentPage: searchParams.currentPage,
            pageSize: searchParams.pageSize,
            totalItems: sceneries.totalItems, // i can't put it in `pagination` object because useState won't change its value because useState is called only once when component is mounting. To update it I would need to use useEffect
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
        />
        <Box display="flex" justifyContent="flex-end">
          <Button to={path(PATHS_SCENERY.ADD)} variant="contained">
            {t("buttons.add")}
          </Button>
        </Box>
      </DashboardLayoutWrapper>

      <ActionModal
        headlineText={t("SceneryPages.list.modal.headlineText")}
        open={sceneryToRemoveModalData.isOpen}
        onClose={() =>
          setSceneryToRemoveModalData({ isOpen: false, name: "", id: "" })
        }
        onActionBtnClickPromise={() =>
          handleDeleteScenery(sceneryToRemoveModalData.id)
        }
        preChildrenTitle={{
          preTitle: t("SceneryPages.list.modal.sceneryPretitle"),
          title: sceneryToRemoveModalData.name,
        }}
      >
        {t("SceneryPages.list.modal.text")}
      </ActionModal>
    </>
  );
};

export default SceneryList;
