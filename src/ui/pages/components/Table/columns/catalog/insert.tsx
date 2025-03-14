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
		id: "call_number",
		label: "CALL\u00A0NO.",
		widthPercent: 20,
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
		id: "publisher",
		label: "PUBLISHER",
		widthPercent: 25,
		sortable: false,
	},
];

export default columns;

