
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Paper, styled, Typography } from '@mui/material';
import { convertQRCode } from '../../../../utils/ImageHelper';


const StyledQRWrapper = styled(Paper)(() => ({
	backgroundColor: "white",
	width: 180,
	height: 240,
	display: "flex",
	flexDirection: "column",
	alignContent: "center",
	justifyContent: "center",
}));

export default function QuickResponseCard({ row, containerRef, handleRemoveEntry }: any) {
	const assignRef = (id: number, ref: HTMLDivElement) => {
		if (ref) {
			containerRef.current.set(id, ref);
		} else {
			containerRef.current.delete(id);
		}
	};

	const RemoveButton = ({ ...props }: any) => {
		return (
			<IconButton {...props}>
				<CloseIcon sx={{ fontSize: "1.2rem", color: "white" }} />
			</IconButton>
		)
	}

	const StyledQRCode = styled(Box)(() => ({
		width: "70%",
		justifySelf: "center",
		alignSelf: "center",
		aspectRatio: "1 / 1",
		backgroundImage: `url(${convertQRCode(row.access_number)})`,
		backgroundSize: "contain", // Ensures image fits without stretching
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
	}));

	const QRText = ({ bold, center, children}: { bold?: boolean; center?: boolean; children: React.ReactNode}) => {
		return (
			<Typography sx={{ 
				fontWeight: bold ? "bold" : undefined, 
				fontSize: 12, 
				whiteSpace: "nowrap", 
				overflow: "hidden", 
				textOverflow: "ellipsis", 
				textAlign: center ? "center" : undefined,
				color: "black"
			}} 
			>{children}
			</Typography>
		)
	}

	return (
		<Box sx={{ borderRadius: 2, overflow: "hidden"}}>
			<Box sx={{width: "100%", display: "flex", justifyContent: "flex-end", backgroundColor: "primary.main"}}>
			<RemoveButton onClick={() => handleRemoveEntry(row.id)} />
			</Box>
			<StyledQRWrapper ref={(el: HTMLDivElement) => assignRef(row.id, el)} variant="elevation" elevation={3}>
					<Box  sx={{ display: "flex", flexDirection: "column", padding: "0 1rem" }}>
						<QRText bold center>{row.access_number}</QRText>
					</Box>
					<StyledQRCode/>
					<Box sx={{ display: "flex", flexDirection: "column", padding: "0 1rem" }}>
						<QRText bold>{row.title}</QRText>
						<QRText>{row.author}</QRText>
						<QRText>{row.call_number}</QRText>
					</Box>
				</StyledQRWrapper>
		</Box>
	);
}
