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
		id: "name",
		label: "Name",
		sortable: true,
		widthPercent: 30,
	},
	{
		id: "description",
		label: "Description",
		sortable: true,
		widthPercent: 70,
	},
];

export default columns;


