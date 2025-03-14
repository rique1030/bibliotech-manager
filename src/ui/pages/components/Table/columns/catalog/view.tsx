const columns: columnsInterface[] = [
	{
		id: "select",
		label: "SELECT",
		box: true,
		align: "center",
	},
	{
		id: "index",
		label: "#",
		box: true,
		align: "center",
	},
	{
		id: "call_number",
		label: "CALL\u00A0NO.",
		sortable: true,
		widthPercent: 15,
	},
	{
		id: "title",
		label: "TITLE",
		sortable: true,
		widthPercent: 25,
	},
	{
		id: "author",
		label: "AUTHOR",
		sortable: true,
		widthPercent: 20,
	},
	{
		id: "publisher",
		label: "PUBLISHER",
		sortable: true,
		widthPercent: 25,
	},
	{
		id: "add_book",
		label: "ADD\u00A0COPY",
		sortable: false,
		align: "center",
		widthPercent: 10,
	},
];

export default columns;
