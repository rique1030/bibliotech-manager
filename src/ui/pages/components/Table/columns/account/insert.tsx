const columns: columnsInterface[] = [
	{
		id: "remove",
		box: true,
		label: "REMOVE",
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
		id: "school_id",
		label: "SCHOOL ID",
		widthPercent: 20,
		sortable: false,
	},
	{
		id: "first_name",
		label: "FIRST NAME",
		widthPercent: 20,
		sortable: false,
	},
	{
		id: "last_name",
		label: "LAST NAME",
		widthPercent: 20,
		sortable: false,
	},
	{
		id: "role_name",
		label: "ROLE",
		align: "center",
		widthPercent: 15,
		sortable: false,
	},
	{
		id: "is_verified",
		label: "VERIFIED",
		align: "center",
		widthPercent: 15,
		sortable: false,
	},
];

export default columns;

