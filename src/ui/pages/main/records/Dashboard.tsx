import { Box, Paper, Typography, useTheme } from "@mui/material";
import MainContainer from "../../components/MainContainer";
import { BarChart, PieChart } from "@mui/x-charts";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const fetchData = async (payload: GetPagedPayload): Promise<any> => {
	return await window.requestRecord.getBookCategoryCount(payload);
};

const fetchUser = async (payload: GetPagedPayload): Promise<any> => {
	return await window.requestUser.getPaged(payload);
};

const fetchUserCount = async (): Promise<any> => {
	return await window.requestRecord.getUserCount();
};

const fetchRoleCount = async (): Promise<any> => {
	return await window.requestRecord.getRoleCount();
};

const fetchBookCount = async (): Promise<any> => {
	return await window.requestRecord.getTotalBookCount();
};

const REFETCH_INTERVAL = 1000 * 20;

export default function Dashboard() {
	const [category, setCategory] = useState<any>([]);
	const [user, setUser] = useState<any>([]);
	const [userCount, setUserCount] = useState<any>(0);
	const [roleCount, setRoleCount] = useState<any>([]);
	const [bookCount, setBookCount] = useState<any>(0);

	const categoryPayload: GetPagedPayload = {
		page: 0,
		per_page: 100,
		filters: undefined,
		order_by: "name",
		order_direction: "asc",
	};

	const userPayload: GetPagedPayload = {
		page: 0,
		per_page: 5,
		filters: undefined,
		order_by: "created_at",
		order_direction: "desc",
	};

	const results = useQueries({
		queries: [
			{
				queryKey: ["bookCategoryCount", categoryPayload],
				queryFn: () => fetchData(categoryPayload),
				staleTime: 0,
				refetchInterval: REFETCH_INTERVAL,
			},
			{
				queryKey: ["user", userPayload],
				queryFn: () => fetchUser(userPayload),
			},
			{
				queryKey: ["userCount"],
				queryFn: () => fetchUserCount(),
				staleTime: 0,
				refetchInterval: REFETCH_INTERVAL,
			},
			{
				queryKey: ["roleCount"],
				queryFn: () => fetchRoleCount(),
				staleTime: 0,
				refetchInterval: REFETCH_INTERVAL,
			},
			{
				queryKey: ["bookCount"],
				queryFn: () => fetchBookCount(),
				staleTime: 0,
				refetchInterval: REFETCH_INTERVAL,
			},
		],
	});

	useEffect(() => {
		if (results[0].data) {
			setCategory(results[0].data.data.items);
		}
		if (results[1].data) {
			setUser(results[1].data.data.items);
		}
		if (results[2].data) {
			setUserCount(results[2].data.data);
		}
		if (results[3].data) {
			setRoleCount(results[3].data.data);
		}
		if (results[4].data) {
			setBookCount(results[4].data.data);
		}
	}, [results]);

	return (
		<MainContainer>
			<Box
				sx={{ display: "flex", flexDirection: "row", gap: 2, height: "100%" }}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						height: "100%",
						width: "50%",
						justifyContent: "space-between",
						gap: 2,
					}}>
					<Chart rows={category} />
					<NewAccounts rows={user} />
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						height: "100%",
						width: "50%",
						justifyContent: "space-between",
						gap: 2,
					}}>
					<RoleChart rows={roleCount} />
					<CountPanel
						title="USERS"
						details="Total Registered Users"
						count={userCount}
					/>
					<CountPanel
						title="BOOKS"
						details="Total Physical Books"
						count={bookCount}
					/>
				</Box>
			</Box>
		</MainContainer>
	);
}

function RoleChart({ rows }: any) {
	const theme = useTheme();
	return (
		<Paper
			sx={{
				padding: 2,
				borderRadius: 5,
				height: "60%",
				width: "100%",
				boxSizing: "border-box",
				border: 1,
				borderColor: theme.palette.divider,
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}>
			<PieChart
				series={[
					{
						data: rows,
					},
				]}
				width={350}
				height={350}
			/>
			<Typography
				variant="overline"
				sx={{
					fontSize: 20,
					color: theme.palette.primary.main,
					fontWeight: "bold",
				}}>
				Book Categories
			</Typography>
		</Paper>
	);
}

function CountPanel({ title, count, details }: any) {
	const theme = useTheme();
	return (
		<Paper
			sx={{
				padding: 2,
				boxSizing: "border-box",
				border: 1,
				borderRadius: 5,
				borderColor: theme.palette.divider,
				width: "100%",
				height: "20%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}>
			<Typography
				variant="overline"
				sx={{
					fontSize: 20,
					color: theme.palette.primary.main,
					whiteSpace: "nowrap",
					width: "70%",
					overflow: "hidden",
					textOverflow: "ellipsis",
					fontWeight: "bold",
				}}>
				{title}:
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					overflow: "hidden",
				}}>
				<Typography
					variant="overline"
					sx={{
						fontSize: 20,
						color: "gray",
						whiteSpace: "nowrap",
						width: "70%",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}>
					{details}:
				</Typography>
				<Typography variant="overline" sx={{ fontSize: 20, color: "gray" }}>
					{count}
				</Typography>
			</Box>
		</Paper>
	);
}

function NewAccounts({ rows }: any) {
	const theme = useTheme();
	const Data = ({ children, width, bordered = false, center = false }: any) => {
		return (
			<Typography
				sx={{
					width: width,
					height: 40,
					borderRight: bordered ? 1 : undefined,
					borderColor: theme.palette.divider,
					display: "flex",
					alignItems: "center",
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
					color: "gray",
					justifyContent: !center ? "flex-start" : "center",
				}}>
				{children}
			</Typography>
		);
	};

	return (
		<Paper
			sx={{
				boxSizing: "border-box",
				borderRadius: 5,
				width: "100%",
				minHeight: 250,
				border: 1,
				borderColor: theme.palette.divider,
				overflow: "hidden",
				paddingBottom: "1rem",
			}}>
			<Typography
				variant="overline"
				sx={{
					padding: "0 20px",
					fontSize: 15,
					color: theme.palette.primary.main,
				}}>
				Recently Created Accounts
			</Typography>
			<Box
				sx={{
					overflowY: "auto",
					height: "100%",
					borderTop: 1,
					borderColor: theme.palette.divider,
					"&::-webkit-scrollbar": {
						display: "block",
					},
				}}>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					{rows.map((row: any, index: number) => (
						<Box
							key={row.id}
							sx={{
								display: "flex",
								flexDirection: "row",
								gap: 2,
								height: 40,
								alignItems: "center",
								borderBottom: index === rows.length - 1 ? 0 : 1,
								borderColor: theme.palette.divider,
							}}>
							<Data center bordered width={"10%"}>
								{index + 1}
							</Data>
							<Data bordered width={"35%"}>
								{row.email}
							</Data>
							<Data width={"45%"}>{row.created_at}</Data>
						</Box>
					))}
				</Box>
			</Box>
		</Paper>
	);
}

function Chart({ rows }: any) {
	const theme = useTheme();
	return (
		<Paper
			sx={{
				padding: 2,
				boxSizing: "border-box",
				height: "100%",
				borderRadius: 5,
				width: "100%",
				border: 1,
				borderColor: theme.palette.divider,
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<BarChart
					borderRadius={5}
					yAxis={[
						{
							colorMap: {
								type: "continuous",
								min: 0,
								max: 10,
								color: [
									theme.palette.primary.dark,
									theme.palette.primary.light,
								],
							},
						},
					]}
					xAxis={[
						{
							id: "barCategories",
							data: rows.map((row: any) => row.name),
							scaleType: "band",
							tickPlacement: "middle",
							tickLabelPlacement: "middle",
						},
					]}
					series={[{ data: rows.map((row: any) => row.book_count) }]}
					width={350}
					height={300}
				/>
				<Typography
					variant="overline"
					sx={{
						fontSize: 20,
						color: theme.palette.primary.main,
						fontWeight: "bold",
					}}>
					Book Categories
				</Typography>
			</Box>
		</Paper>
	);
}
