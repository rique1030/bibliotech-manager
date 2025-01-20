import { Box, Skeleton, Theme } from "@mui/material";
import CONFIG from "../../../../../config.ts";
import React from "react";

const BorderedImage = ({
	src,
	alt,
	sx,
	isLoading,
}: {
	src: string;
	alt: string;
	sx?: any;
	isLoading: boolean;
}) => {
	const [imageLoaded, setImageLoaded] = React.useState(false);

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	const [imageLoading, setImageLoading] = React.useState(isLoading);

	React.useEffect(() => {
		if (!isLoading) {
			setTimeout(() => {
				setImageLoading(false);
			}, 1000);
		}
	}, [isLoading]);

	return (
		<React.Fragment>
			{imageLoading && (
				<Skeleton
					variant="rectangular"
					sx={{
						width: sx?.width,
						height: sx?.height,
						minWidth: sx?.width,
						minHeight: sx?.height,
						margin: 0,
						padding: 0,
						opacity: imageLoaded ? 0 : 1,
						transition: "opacity 0.3s ease-in-out",
					}}
					animation="wave"
				/>
			)}
			{!imageLoading && (
				<Box
					component={"img"}
					src={src}
					alt={alt}
					onLoad={handleImageLoad}
					sx={(theme: Theme) => ({
						opacity: imageLoaded ? 1 : 0,
						transition: "opacity 1s ease-in-out",
						objectFit: "cover",
						border: "solid",
						borderWidth: 2,
						borderColor: `primary.main`,
						borderRadius: theme.shape.borderRadius,
						...sx,
					})}
				/>
			)}
		</React.Fragment>
	);
};

export default BorderedImage;
