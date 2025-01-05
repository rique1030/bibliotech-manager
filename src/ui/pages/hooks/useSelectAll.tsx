import { useState } from "react";
function useSelectAll<T>(items: T[]) {
  const [selectedItems, setSelectedItems] = useState<Set<T>>(new Set());

  const toggleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items));
    }
  };

  const toggleSelectItem = (item: T) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(item)) {
        newSelected.delete(item);
      } else {
        newSelected.add(item);
      }
      return newSelected;
    });
  };

  const isSelected = (item: T) => selectedItems.has(item);
  const isAllSelected = selectedItems.size === items.length;
  const isIntermediate = selectedItems.size > 0 && !isAllSelected; // Partial selection state

  return {
    selectedItems,
    toggleSelectAll,
    toggleSelectItem,
    isSelected,
    isAllSelected,
    isIntermediate,
  };
}

export default useSelectAll;
