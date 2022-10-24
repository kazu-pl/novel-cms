import { CustomizedColumnFromStore } from "components/DynamicTable/CustomizeDynamicTable";
import { DynamicTableColumn } from "../DynamicTable";

/**
 * List of columns returned by this function should be used as `columns` prop of `DynamicTable` component
 *
 * It filters columns based on the current cols from store and then returns the corresponding column object from `allPossibleColumns` becuase redux keeps only `key` prop, `isActive` key and `isCustomColumn` key so this function returns list of active columns full objects (from `allPossibleColumns`) passed down to the table
 */
const generateActiveColumnsToDisplay = <T>(
  tableCurrentColumnsFromRedux: CustomizedColumnFromStore[],
  allPossibleColumns: DynamicTableColumn<T>[]
) =>
  tableCurrentColumnsFromRedux
    .filter((item) => item.isActive)
    .map((item) => {
      const correspondingItem = allPossibleColumns.find(
        (col) => col.key === item.key
      )!;

      return {
        ...correspondingItem,
      };
    });

export default generateActiveColumnsToDisplay;
