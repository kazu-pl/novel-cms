import { CustomizedColumnFromStore } from "components/DynamicTable/CustomizeDynamicTable";
import { DynamicTableColumn } from "components/DynamicTable/DynamicTable";

/**
 * It returns list of columns that should should be passed to `CustomizeDynamicTable` component as `columns` prop
 */
const generateCustomizeDynamicTableColumns = <T>(
  tableCurrentColumnsFromRedux: CustomizedColumnFromStore[],
  allPossibleColumns: DynamicTableColumn<T>[]
) =>
  tableCurrentColumnsFromRedux.map((col) => {
    const correspondingItem = allPossibleColumns.find(
      (item) => item.key === col.key
    )!;

    return {
      fixed: correspondingItem.fixed,
      key: correspondingItem.key,
      title: correspondingItem.title,
      isActive: col.isActive,
      isCustomColumn: col.isCustomColumn,
    };
  });

export default generateCustomizeDynamicTableColumns;
