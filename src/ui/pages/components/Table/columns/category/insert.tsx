const columns: columnsInterface[] = [
	{
		id: "remove",
		label: "REMOVE",
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
		id: "name",
		label: "Name",
		sortable: false,
		widthPercent: 30,
	},
	{
		id: "description",
		label: "Description",
		sortable: false,
		widthPercent: 70,
	},
];

export default columns;

