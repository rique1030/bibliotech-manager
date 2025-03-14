const columns: columnsInterface[] = [
	{
		id: "select",
		box: true,
		label: "SELECT",
	},
	{
		id: "index",
		label: "#",
		box: true,
		align: "center",
	},
	{
		id: "school_id",
		label: "SCHOOL ID",
		widthPercent: 20,
		sortable: true,
	},
	{
		id: "first_name",
		label: "FIRST NAME",
		widthPercent: 20,
		sortable: true,
	},
	{
		id: "last_name",
		label: "LAST NAME",
		widthPercent: 20,
		sortable: true,
	},
	{
		id: "role_name",
		label: "ROLE",
		align: "center",
		widthPercent: 15,
		sortable: true,
	},
	{
		id: "is_verified",
		label: "VERIFIED",
		align: "center",
		widthPercent: 15,
		sortable: true,
	},
];

export default columns;

