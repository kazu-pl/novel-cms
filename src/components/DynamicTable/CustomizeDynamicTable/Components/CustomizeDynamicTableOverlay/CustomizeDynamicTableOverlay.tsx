import Button from "novel-ui/lib/buttons/Button";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import ColumnCheckbox, { ColumnCheckboxProps } from "../ColumnCheckbox";
import {
  StyledActionBtnsWrapper,
  StyledColumnsControlsWrapper,
  StyledColumnsWrapper,
  StyledPaper,
} from "./styles";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ColumnsList from "../ColumnsList";
import { FormControlLabel } from "@mui/material";
import AutoComplete from "novel-ui/lib/inputs/Autocomplete";
import { useTranslation } from "react-i18next";

export type FixedType = boolean;

/**
 * This is the type of columns you should store in redux. It should be used as type for both initial and current columns stored in redux
 */
export interface CustomizedColumnFromStore {
  /**
   * `key` needs to be the same as `key` prop in corresponding table column
   */
  key: string;
  isActive: boolean;
  isCustomColumn?: boolean;
}

interface Column extends CustomizedColumnFromStore {
  title: string;
  fixed: FixedType | undefined; // this is intentional to be required field for you to pass it even if the column does not have `fixed` prop
}

export interface CustomizeDynamicTableOverlayProps {
  /**
   * Pass here array of initial columns. When you click `Default` btn, it will reset table based on initial columns you pass
   */
  initialColumns: CustomizedColumnFromStore[];
  /**
   * Pass here the same columns you use for table but do not filter them, only map and add isActive key.
   *
   * You Should pass here list returned by `generateCustomizeDynamicTableColumns` util:
   *
   * @example
   *  const activeColumnsToDisplay = generateActiveColumnsToDisplay(
   *    tableCurrentColumnsFromRedux,
   *    allPossibleColumns
   *  );
   *
   *  <CustomizeDynamicTable
   *    columns={generateCustomizeDynamicTableColumns(
   *      tableCurrentColumnsFromRedux,
   *      allPossibleColumns
   *    )}
   *  />
   */
  columns: Column[];
  /**
   * Use this callback to update columns in store
   * @example
   *
   * const MyView = () => {
   *
   *    return (
   *    <CustomizeDynamicTable
   *     setColumns={(columns)=>{
   *      dispatch(documentsActions.updateDocumentsTableColumns(columns));
   *     }}
   *    />
   *   );
   * }
   */
  setColumns: (columns: CustomizedColumnFromStore[]) => void;
  columnDragColor?: ColumnCheckboxProps["dragColor"];
  selectHighlightColor?: ColumnCheckboxProps["selectHighlightColor"];
  disableDragForFixedColumns?: boolean;
  dragDisabledColor?: ColumnCheckboxProps["dragDisabledColor"];
  setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const columnsWrapperId = "columns";
const columnsControlsWrapperId = "controls-wrapper";
const columnsWrapperVerticalMargin = 16;

const CustomizeDynamicTableOverlay = ({
  initialColumns,
  columns,
  setColumns,
  columnDragColor,
  selectHighlightColor,
  dragDisabledColor,
  disableDragForFixedColumns = true,
  setIsOverlayVisible,
}: CustomizeDynamicTableOverlayProps) => {
  const { t } = useTranslation();
  const [allColumns, setAllColumns] = useState(columns);

  const getActiveColumns = (specificColumns?: Column[]) =>
    (specificColumns || allColumns).filter((column) => column.isActive);

  const changeDynamicTableColumns = () => {
    setColumns(
      allColumns.map(
        (item) =>
          ({
            isActive: item.isActive,
            key: item.key as string,
            isCustomColumn: item.isCustomColumn,
          } as CustomizedColumnFromStore)
      )
    );
  };

  const toggleAllColumns = () => {
    const activeColumns = getActiveColumns();

    setAllColumns((prevColumns) =>
      prevColumns.map((prevCol) => ({
        ...prevCol,
        isActive: !(activeColumns.length === allColumns.length),
      }))
    );
  };

  const handleResetColumns = () => {
    setAllColumns((prevColumns) => {
      return initialColumns.map((prevInitialColumn) => {
        const correspondigCol = prevColumns.find(
          (item) => item.key === prevInitialColumn.key
        )!;

        return {
          ...correspondigCol,
          isActive: prevInitialColumn.isActive,
        };
      });
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (allColumns[destination.index].fixed) return;

    const originalColumns = [...allColumns];

    const movedColumn = { ...originalColumns[source.index] };

    originalColumns.splice(source.index, 1);
    originalColumns.splice(destination.index, 0, movedColumn);

    setAllColumns(originalColumns);
  };

  return (
    <StyledPaper data-testid="overlay-paper">
      <AutoComplete
        options={allColumns.map((item) => ({
          id: item.key,
          label: item.title,
        }))}
        style={{ width: `100%` }}
        onChange={(
          event,
          option //: { id: string; label: string } // `id` here is just item.key from options prop provided above
        ) => {
          if (!option) return; // when user removes searching string (the input is empty) then do nothing - otherwise it will run into an error

          const columnsWrapper = document.querySelector(
            `[data-id='` + columnsWrapperId + `']`
          ) as HTMLDivElement;

          const destinationColumn = document.querySelector(
            `[data-column-id='` + option.id + `']`
          ) as HTMLDivElement;

          const controlsWrapper = document.querySelector(
            `[data-id='` + columnsControlsWrapperId + `']`
          ) as HTMLDivElement;

          const columnsWrapperVerticalMargins =
            2 * columnsWrapperVerticalMargin;
          const controlsWrapperHeightWithBottomMargin =
            controlsWrapper.offsetHeight + columnsWrapperVerticalMargin;

          columnsWrapper?.scrollTo({
            top:
              destinationColumn.offsetTop -
              destinationColumn.clientHeight -
              columnsWrapperVerticalMargins -
              controlsWrapperHeightWithBottomMargin,
            behavior: "smooth",
          });

          destinationColumn?.classList.add("active");
          setTimeout(() => {
            destinationColumn?.classList.remove("active");
          }, 2000);
        }}
        inputLabel={t("search")}
      />

      <StyledColumnsControlsWrapper
        mb={columnsWrapperVerticalMargin}
        data-id={columnsControlsWrapperId}
      >
        <FormControlLabel
          control={
            <Checkbox
              indeterminate={
                getActiveColumns().length !== 0 &&
                getActiveColumns().length !== allColumns.length
              }
              onChange={toggleAllColumns}
              checked={getActiveColumns().length > 0}
            />
          }
          label={t("buttons.selectAll")}
        />

        <Button variant="text" onClick={handleResetColumns}>
          <span className="ant-btn-link">{t("default")}</span>
        </Button>
      </StyledColumnsControlsWrapper>
      <StyledColumnsWrapper
        data-id={columnsWrapperId}
        marginYAxis={columnsWrapperVerticalMargin}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <ColumnsList columnId="columns">
            {allColumns.map((column, columnIndex) => (
              <ColumnCheckbox
                dataColumnId={`${column.key}`}
                dndProps={{
                  draggableId: column.key,
                  indexForDraggable: columnIndex,
                  isDragDisabled: disableDragForFixedColumns && !!column.fixed,
                }}
                dragColor={columnDragColor}
                selectHighlightColor={selectHighlightColor}
                dragDisabledColor={dragDisabledColor}
                key={column.key}
                checked={
                  allColumns.filter(
                    (col) => col.isActive && col.key === column.key
                  ).length > 0
                }
                value={column.key}
                data-columnId={column.title}
                onChange={(event) => {
                  setAllColumns((prevCols) =>
                    prevCols.map((prevCol) => ({
                      ...prevCol,
                      ...(column.key === prevCol.key && {
                        isActive: !prevCol.isActive,
                      }),
                    }))
                  );
                }}
              >
                {column.title}
              </ColumnCheckbox>
            ))}
          </ColumnsList>
        </DragDropContext>
      </StyledColumnsWrapper>
      <StyledActionBtnsWrapper>
        <Button
          onClick={() => setIsOverlayVisible((prev) => !prev)}
          data-testid="overlay-close-btn"
        >
          {t("buttons.cancel")}
        </Button>
        <Button
          onClick={() => {
            setIsOverlayVisible(false);
            changeDynamicTableColumns();
          }}
          variant="outlined"
        >
          {t("buttons.submit")}
        </Button>
      </StyledActionBtnsWrapper>
    </StyledPaper>
  );
};

export default CustomizeDynamicTableOverlay;
