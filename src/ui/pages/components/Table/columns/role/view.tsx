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
		id: "role_name",
		label: "ROLE NAME",
		align: "center",
		sortable: true,
		widthPercent: 30,
	},
	{
		id: "notes",
		label: "NOTES",
		sortable: true,
		widthPercent: 70,
	},
];

export default columns;
