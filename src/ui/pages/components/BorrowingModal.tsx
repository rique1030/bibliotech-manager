import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Divider,
	Paper,
	styled,
	TableCell,
	TableRow,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import MultipleStopRoundedIcon from "@mui/icons-material/MultipleStopRounded";
import { convertCover, convertProfile } from "../../utils/ImageHelper";
import ConvertToLetterCase from "../helper/ConvertToLetterCase";

interface RequestImageProps {
	data?: any;
	src: string;
	width: number;
	height: number;
	padding: number;
	radius: number;
	sx?: any;
}

const RequestImage = ({
	data,
	src,
	width,
	height,
	padding,
	radius,
	sx,
}: RequestImageProps) => {
	const ImageContainer = styled(Paper)(({ theme }) => ({
		width: `${width}rem`,
		height: `${height}rem`,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: `${radius + padding / 2}rem`,
		border: "1px solid ",
		backgroundColor: "background.paper",
		borderColor: theme.palette.divider,
	}));

	const StyledImage = styled("img")(() => ({
		width: `${width - padding}rem`,
		height: `${height - padding}rem`,
		borderRadius: "0.5rem",
	}));

	return (
		<ImageContainer sx={sx}>
			<Tooltip title={data}>
				<StyledImage src={src} />
			</Tooltip>
		</ImageContainer>
	);
};

const RowCell = styled(TableCell)(() => ({
	fontSize: "0.8rem",
	padding: "0.5rem",
	boxSizing: "border-box",
	borderBottom: 0,
}));

const LeftRowCell = styled(RowCell)(() => ({
	fontWeight: "bold",
	maxWidth: "100px",
}));

interface ConfirmBorrowProps {
	requestHook: any;
}

const ConfirmBorrow = memo(({ requestHook }: ConfirmBorrowProps) => {
	const [book, setBook] = useState<any>({});
	const [user, setUser] = useState<any>({});
	const {
		dayState: { days, setDays },
		error,
		data,
		requestModalOpen,
		handleRequestResponse,
	} = requestHook;

	const handleBorrowAccept = async () => {
		await handleRequestResponse({
			approved: true,
			request_id: data.request_id,
			borrow: data.borrow,
			num_days: days,
		});
	};

	const handleBorrowDeny = async () => {
		await handleRequestResponse({
			approved: false,
			request_id: data.request_id,
			borrow: data.borrow,
			num_days: days,
		});
	};

	useEffect(() => {
		setBook(data?.book);
		setUser(data?.user);
	}, [data]);

	const UserLabel = () => {
		const name = `${ConvertToLetterCase(
			user?.first_name
		)} ${ConvertToLetterCase(user?.last_name)}`;
		return (
			<Box>
				<Typography variant="subtitle2">{name}</Typography>
				<Typography sx={{ color: "text.secondary" }} variant="caption">
					{user?.school_id}
				</Typography>
			</Box>
		);
	};

	const ModalText = ({
		bold,
		center,
		children,
		sx,
	}: {
		bold?: boolean;
		center?: boolean;
		children: React.ReactNode;
		sx?: any;
	}) => {
		return (
			<Typography
				sx={{
					fontWeight: bold ? "bold" : undefined,
					fontSize: 24,
					lineHeight: 1.8,
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
					textAlign: center ? "center" : undefined,
					...sx,
				}}>
				{children}
			</Typography>
		);
	};
	return (
		<Dialog open={requestModalOpen}>
			<Box
				sx={{ height: 350, width: 450, backgroundColor: "background.paper" }}>
				<ModalImages
					book_label={""}
					user_label={<UserLabel />}
					book_image={convertCover(book?.cover_image)}
					user_image={convertProfile(user?.profile_pic)}
				/>

				<Divider variant="middle" />
				<DialogContent
					sx={{
						padding: "1rem 2rem",
						boxSizing: "border-box",
					}}>
					<ModalText center sx={{ color: "text.secondary" }} bold>
						<Box
							component={"span"}
							sx={{
								color: "text.primary",
								fontWeight: "bold",
								textTransform: "capitalize",
								whiteSpace: "wrap",
							}}>
							{ConvertToLetterCase(user?.first_name) || "User"}
						</Box>
						{" would like to "}
						<Box
							component={"span"}
							sx={{
								color: "text.primary",
								fontWeight: "bold",
								textTransform: "capitalize",
								whiteSpace: "wrap",
							}}>
							{data?.borrow === true ? "borrow" : "return"}
						</Box>
					</ModalText>
					<Box
						sx={{
							marginTop: "1rem",
							display: "flex",
							flexDirection: "column",
						}}>
						<ModalText bold>{book?.title || "Unknown Book"}</ModalText>
						<ModalText sx={{ opacity: 0.5, fontSize: "0.8rem" }}>
							{"by "}
							{book?.author || "Unknown"}
						</ModalText>
						<ModalText
							sx={{
								opacity: 0.5,
								fontSize: "0.8rem",
							}}>
							{book?.access_number}
						</ModalText>
					</Box>
				</DialogContent>
			</Box>
			<DialogActions
				sx={{
					padding: "1rem",
					boxSizing: "border-box",
					backgroundColor: "background.paper",
					display: data?.type === "borrow" ? "flex" : "inline-flex",
					justifyContent:
						data?.type === "borrow" ? "space-between" : "flex-end",
				}}>
				{data?.borrow && (
					<TextField
						value={days.toString()}
						onChange={(e) => setDays(parseInt(e.target.value))}
						error={error}
						label="Days"
						type="number"
						size="small"
						slotProps={{ input: { inputProps: { min: 1 } } }}
						sx={{ maxWidth: "120px" }}
					/>
				)}
				<Box>
					<Button onClick={handleBorrowDeny}>Decline</Button>
					<Button onClick={handleBorrowAccept}>Accept</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
});
const ModalImages = memo(
	({
		book_image,
		book_label,
		user_image,
		user_label,
	}: {
		book_image: string;
		book_label: any;
		user_image: string;
		user_label: any;
	}) => {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: "1rem",
					width: "100%",
					padding: "1rem",
					boxSizing: "border-box",
				}}>
				<RequestImage
					sx={{
						"@keyframes fromRight": {
							from: { transform: "translate(10rem, 0px)" },
							to: { transform: "translate(0px, 0px)" },
						},
						animation: "fromRight 0.3s ease-out forwards",
					}}
					data={user_label}
					width={6}
					height={6}
					padding={0.75}
					radius={0.5}
					src={user_image}
				/>
				<MultipleStopRoundedIcon sx={{ color: "text.secondary" }} />
				<RequestImage
					sx={{
						"@keyframes fromLeft": {
							from: { transform: "translate(-10rem, 0px)" },
							to: { transform: "translate(0px, 0px)" },
						},
						animation: "fromLeft 0.3s ease-out forwards",
					}}
					width={4}
					height={6}
					padding={0.75}
					radius={0.5}
					src={book_image}
					data={book_label}
				/>
			</Box>
		);
	}
);

function ModalRow({ label, text }: { label: string; text: string }) {
	return (
		<TableRow>
			<LeftRowCell>{label}:</LeftRowCell>
			<RowCell>
				<Typography
					sx={{
						maxWidth: "200px",
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
					variant="body2">
					{text}
				</Typography>
			</RowCell>
		</TableRow>
	);
}

export default ConfirmBorrow;
