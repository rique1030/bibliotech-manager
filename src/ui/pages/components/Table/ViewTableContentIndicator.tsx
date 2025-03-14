import { Box, styled } from "@mui/material";
import { memo, useEffect, useLayoutEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import Typography from "@mui/material/Typography";

interface ContentIndicatorProps {
	loading: boolean;
	rowed?: boolean;
}

const IndicatorWrapper = styled(Box)(() => ({
	opacity: 0.5,
	display: "flex",
	flexDirection: "column",
	gap: 2,
	position: "absolute",
	top: 0,
	left: 0,
	height: "100%",
	width: "100%",
	justifyContent: "center",
	alignItems: "center",
	transition: "opacity 0.3s ease-in-out",
}));

const ContentIndicator = memo(function ({
	loading,
	rowed = false,
}: ContentIndicatorProps) {
	const [isLoading, setLoading] = useState(true);
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		if (!mounted) {
			setTimeout(() => setMounted(true), 1000);
		}
		setLoading(loading);
	}, [loading]);
	const LoadingIndicator = (
		<CircularProgress thickness={0.5} color="primary" size={50} />
	);
	const EmptyIndicator = (
		<HighlightAltIcon
			sx={{
				transform: rowed ? "translateY(4rem)" : undefined,
				fontSize: "10vw",
				color: "text",
			}}
		/>
	);
	const IndicatorText = (
		<Typography
			variant="h5"
			sx={{
				transform: rowed ? "translateY(4rem)" : undefined,
				color: "text",
				fontWeight: "bold",
			}}>
			{isLoading ? "Loading data" : "No results"}
		</Typography>
	);
	return (
		<IndicatorWrapper>
			{isLoading ? LoadingIndicator : EmptyIndicator}
			{IndicatorText}
		</IndicatorWrapper>
	);
});

export default ContentIndicator;
