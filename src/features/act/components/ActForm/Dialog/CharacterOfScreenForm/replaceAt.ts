/**
 * this method replaces an item in array and returns new array (with repalced item) at the same time.
 */
export default function replaceAt(
  array: any[],
  indexOfElementToReplace: number,
  newValue: any
) {
  const ret = array.slice(0);
  ret[indexOfElementToReplace] = newValue;
  return ret;
}

// Solution found here: https://www.peterbe.com/plog/replace-an-item-in-an-array-without-mutation-in-javascript
