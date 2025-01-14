import { useState } from "react";
function useSelectAll<T>(items: T[]) {
	const [selectedItems, setSelectedItems] = useState<T[]>([]);

	const toggleSelectAll = () => {
		if (selectedItems.length === items.length) {
			setSelectedItems([]);
		} else {
			setSelectedItems(items.slice());
		}
	};

	const toggleSelectItem = (item: T) => {
		setSelectedItems((prevSelected) => {
			const newSelected = [...prevSelected];
			const index = newSelected.indexOf(item);
			if (index > -1) {
				newSelected.splice(index, 1);
			} else {
				newSelected.push(item);
			}
			return newSelected;
		});
	};

	const isSelected = (item: T) => selectedItems.includes(item);
	const isAllSelected = selectedItems.length === items.length;
	const isIntermediate = selectedItems.length > 0 && !isAllSelected; // Partial selection state

	return {
		selectedItems,
		setSelectedItems,
		toggleSelectAll,
		toggleSelectItem,
		isSelected,
		isAllSelected,
		isIntermediate,
	};
}

export default useSelectAll;
