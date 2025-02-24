const renderCellValue = (cellValue: any): string => {
	if (cellValue instanceof Date) {
		const formattr = new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});
		return formattr.format(cellValue);
	}
	if (cellValue === undefined || cellValue === null || cellValue === "")
		return "Enter Value";
	return cellValue;
};
export default renderCellValue;
