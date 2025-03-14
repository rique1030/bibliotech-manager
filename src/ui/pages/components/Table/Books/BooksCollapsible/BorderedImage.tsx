import { Box, Skeleton, styled, Theme } from "@mui/material";
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

	const Loader = (
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
	)

	const CustomImage = styled("img") (({theme}: { theme: Theme }) => ({
		opacity: imageLoaded ? 1 : 0,
		width: sx?.width,
		height: sx?.height,
		minWidth: sx?.width,
		minHeight: sx?.height,
		transition: "opacity 1s ease-in-out",
		objectFit: "cover",
		border: "solid",
		borderWidth: 2,
		borderColor: theme.palette.primary.main,
		borderRadius: theme.shape.borderRadius,
		boxSizing: "border-box",
		...sx,
	}))

	const ImageComponent = (
		<CustomImage
			src={src}
			alt={alt}
			onLoad={handleImageLoad}
		/>
	)

	return imageLoading ? Loader : ImageComponent
};

export default BorderedImage;
