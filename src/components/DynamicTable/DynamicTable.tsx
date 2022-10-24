import Table, { TableProps, ColumnType } from "novel-ui/lib/Table";
import { FixedType } from "./CustomizeDynamicTable/Components/CustomizeDynamicTableOverlay/CustomizeDynamicTableOverlay";

export interface DynamicTableColumn<T> extends Omit<ColumnType<T>, "title"> {
  /**
   * `title` prop has to be of type string because MUI does not allow to render ReactNode inside of Autocomplete input?
   */
  title: string;
  /**
   * `width` should be number and not string (like `10%`) because when you toggle custom columns to be visible they would all be visible and it would look weird when the table is 1000px width and dispalys 20 columns. It's better to have them with fied width in pixels and scroll between them
   */
  width?: number;
  fixed?: FixedType; // if passed, column will be fixed when scrolling and will always remain visible
}

export interface DynamicTableProps<T> extends Omit<TableProps<T>, "columns"> {
  data: T[];
  /**
   * as `columns` pass here result of `generateActiveColumnsToDisplay` function
   *
   * @example
   * const activeColumnsToDisplay = generateActiveColumnsToDisplay(
   *   tableCurrentColumnsFromRedux,
   *   allPossibleColumns
   * );
   *
   * <DynamicTable columns={activeColumnsToDisplay} />;
   */
  columns: DynamicTableColumn<T>[];
}

/**
 * Main purpose of thic `DynamicTable` component is to make regular `Table` component compatible with `CustomizeDynamicTable`
 */
const DynamicTable = <T,>({
  data,
  columns,
  ...props
}: DynamicTableProps<T>) => {
  return <Table data={data} columns={columns} {...props} />;
};

export default DynamicTable;
