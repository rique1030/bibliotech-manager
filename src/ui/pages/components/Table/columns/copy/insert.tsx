const columns: columnsInterface[] = [
	{
		id: "delete",
		label: "DELETE",
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
			sortable: false,
	},
	{
			id: "author",
			label: "AUTHOR",
			widthPercent: 25,
			sortable: false,
	},
	{
		id: "access_number",
		label: "ACC NO.",
		widthPercent: 30,
		sortable: false,
	},
	{
		id: "status",
		label: "STATUS",
		align: "center",
		widthPercent: 15,
		sortable: false,
	},
];

export default columns;

