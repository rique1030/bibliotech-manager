const columns: columnsInterface[] = [
	{
		id: "index",
		label: "#",
		box: true,
		align: "center",
		sortable: false,
	},
	{
		id: "access_number",
		label: "ACC NO.",
		sortable: true,
		widthPercent: 20,
	},
	{
		id: "title",
		label: "TITLE",
		sortable: true,
		widthPercent: 15,
	},
	{
		id: "full_name",
		label: "BORROWER NAME",
		sortable: true,
		widthPercent: 15,
	},
	{
		id: "borrowed_date",
		label: "BORROWED",
		sortable: true,
		widthPercent: 15,
	},
	{
		id: "due_date",
		label: "DUE DATE",
		sortable: true,
		widthPercent: 15,
	},
	{
		id: "status",
		label: "STATUS",
		align: "center",
		sortable: true,
		widthPercent: 15,
	},
];

export default columns;
