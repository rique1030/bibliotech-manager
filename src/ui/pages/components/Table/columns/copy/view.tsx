const columns: columnsInterface[] = [
	{
		id: "select",
		label: "SELECT",
		box: true,
		align: "center",
		sortable: false,
	},
	{
		id: "index",
		label: "#",
		box: true,
		align: "center",
		sortable: false,
	},
	{
			id: "title",
			label: "TITLE",
			widthPercent: 30,
			sortable: true,
	},
	{
			id: "author",
			label: "AUTHOR",
			widthPercent: 25,
			sortable: true,
	},
	{
		id: "access_number",
		label: "ACC NO.",
		widthPercent: 30,
		sortable: true,
	},
	{
		id: "status",
		label: "STATUS",
		align: "center",
		widthPercent: 15,
		sortable: true,
	},
];

export default columns;

