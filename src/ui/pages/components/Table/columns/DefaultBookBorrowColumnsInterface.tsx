const columns: columnsInterface[] = [
	{
		id: "access_number",
		label: "ACC NO.",
		title: "Access Number",
		minWidth: 20,
		maxWidth: 150,
		align: "right",
	},
	{
		id: "title",
		label: "TITLE",
		title: "Title",
		minWidth: 20,
		maxWidth: 150,
	},
	{
		id: "full_name",
		label: "FULL NAME",
		title: "Full Name",
		minWidth: 200,
		maxWidth: 200,
		width: "99rem",
	},
	{
		id: "borrowed_date",
		label: "BORROWED",
		title: "Borrowed",
		minWidth: 150,
		maxWidth: 200,
		width: "99rem",
		align: "right",
	},
	{
		id: "due_date",
		label: "DUE DATE",
		title: "Due",
		minWidth: 150,
		maxWidth: 200,
		width: "99rem",
		align: "right",
	},
	{
		id: "status",
		label: "STATUS",
		title: "Status",
		minWidth: 80,
		maxWidth: 120,
		align: "center",
	},
];

export default columns;
