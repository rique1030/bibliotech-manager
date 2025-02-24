import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Divider,
	Paper,
	styled,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { memo } from "react";
import MultipleStopRoundedIcon from "@mui/icons-material/MultipleStopRounded";
import { convertCover, convertProfile } from "../../utils/ImageHelper";

interface RequestImageProps {
	src: string;
	width: number;
	height: number;
	padding: number;
	radius: number;
	sx?: any;
}

const RequestImage = ({
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
			<StyledImage src={src} />
		</ImageContainer>
	);
};

const RowCell = styled(TableCell)(() => ({
	// fontSize: "0.75rem",
	fontSize: "0.8rem",
	padding: "0.5rem",
	boxSizing: "border-box",
}));

const LeftRowCell = styled(RowCell)(() => ({
	fontWeight: "bold",
	maxWidth: "100px",
}));

interface ConfirmBorrowProps {
	requestHook: any;
}

const ConfirmBorrow = memo(({ requestHook }: ConfirmBorrowProps) => {
	const {
		dayState: { days, setDays },
		error,
		data,
		requestModalOpen,
		handleBorrowDeny,
		handleBorrowAccept,
	} = requestHook;

	return (
		<Dialog open={requestModalOpen}>
			<Box sx={{ height: "450px", width: "400px" }}>
				<ModalImages
					book_image={convertCover(data?.book?.cover_image)}
					user_image={convertProfile(data?.user?.profile_pic)}
				/>
				<Divider variant="middle" />
				<DialogContent
					sx={{
						padding: "1rem",
						boxSizing: "border-box",
					}}
				>
					<Typography sx={{ padding: "1rem 0px" }} variant="h6">
						{data?.user?.first_name} would like to{" "}
						{data?.type === "borrow" ? "borrow" : "return"} :
					</Typography>
					<TableContainer>
						<Table>
							<TableBody>
								<ModalRow label="Title" text={data?.book?.title} />
								<ModalRow label="Author" text={data?.book?.author} />
								<ModalRow label="Publisher" text={data?.book?.publisher} />
								<ModalRow
									label="Access Number"
									text={data?.book?.access_number}
								/>
								<ModalRow label="Call Number" text={data?.book?.call_number} />
							</TableBody>
						</Table>
					</TableContainer>
				</DialogContent>
			</Box>
			<DialogActions
				sx={{
					padding: "1rem",
					boxSizing: "border-box",
					display: data?.type === "borrow" ? "flex" : "inline-flex",
					justifyContent:
						data?.type === "borrow" ? "space-between" : "flex-end",
				}}
			>
				{data?.type === "borrow" && (
					<TextField
						value={days.toString()}
						onChange={(e) => setDays(parseInt(e.target.value))}
						error={error}
						label="Days"
						type="number"
						size="small"
						slotProps={{ input: { inputProps: { min: 1 } } }}
						sx={{ maxWidth: "150px" }}
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
	({ book_image, user_image }: { book_image: string; user_image: string }) => {
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
				}}
			>
				<RequestImage
					sx={{
						"@keyframes fromRight": {
							from: { transform: "translate(10rem, 0px)" },
							to: { transform: "translate(0px, 0px)" },
						},
						animation: "fromRight 0.3s ease-out forwards",
					}}
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
					variant="body2"
				>
					{text}
				</Typography>
			</RowCell>
		</TableRow>
	);
}

export default ConfirmBorrow;
