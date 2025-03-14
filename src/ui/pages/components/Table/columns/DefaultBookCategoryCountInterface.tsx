const columns: columnsInterface[] = [
	{
		id: "index",
		label: "#",
		box: true,
		align: "center",
		sortable: false,
	},
	{
		id: "name",
		label: "CATEGORY",
		sortable: true,
		widthPercent: 20,
	},
	{
		id: "description",
		label: "DESCRIPTION",
		sortable: true,
		widthPercent: 65,
	},
	{
		id: "book_count",
		label: "BOOKS",
		align: "center",
		sortable: true,
		widthPercent: 15,
	},
];

export default columns;
