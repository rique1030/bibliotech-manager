const columns: columnsInterface[] = [
	{
		id: "index",
		label: "#",
		box: true,
		align: "center",
		sortable: false,
	},
	{
		id: "call_number",
		label: "CALL NO",
		widthPercent: 20,
		sortable: true,
	},
	{
		id: "title",
		label: "TITLE",
		widthPercent: 25,
		sortable: true,
	},
	{
		id: "author",
		label: "AUTHOR",
		widthPercent: 20,
		sortable: true,
	},
	{
		id: "publisher",
		label: "PUBLISHER",
		widthPercent: 20,
		sortable: true,
	},
	{
		id: "copies",
		label: "COPY",
		align: "center",
		widthPercent: 15,
		sortable: true,
	},
];

export default columns;

