import { useState } from "react";

export default function useCollapsibleManager() {
	const [OpenedRowIndex, setOpenedRowIndex] = useState<number>(-1);

	const handleRowClick = (index: number) => {
		if (OpenedRowIndex === index) {
			setOpenedRowIndex(-1);
		} else {
			setOpenedRowIndex(index);
		}
	};

	return { OpenedRowIndex, handleRowClick };
}
