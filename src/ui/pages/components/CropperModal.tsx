import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	Slider,
	Typography,
} from "@mui/material";
import React, { createContext, useContext } from "react";
import Cropper from "react-easy-crop";
import useCropperModal from "../hooks/useCropperModal";

interface CropperModalContextProps {
	cropper: {
		aspectRatio: number;
		url: string;
		open: boolean;
		crop: { x: number; y: number };
		setCrop: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
		zoom: number;
		setZoom: React.Dispatch<React.SetStateAction<number>>;
		onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
		showCropperModal: (
			aspectRatio: number,
			imageSrc: string
		) => Promise<{ imgString: string | null; blob: Blob | null }>;
		handleSubmit: () => Promise<void>;
		handleClose: () => void;
	};
}

export const CropperModalContext = createContext<CropperModalContextProps>({
	cropper: {
		aspectRatio: 1,
		url: "",
		open: false,
		crop: { x: 0, y: 0 },
		setCrop: () => {},
		zoom: 1,
		setZoom: () => {},
		onCropComplete: () => {},
		showCropperModal: () => Promise.resolve({ imgString: null, blob: null }),
		handleSubmit: () => Promise.resolve(),
		handleClose: () => {},
	},
});

export default function CropperModalProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const cropper = useCropperModal();
	return (
		<CropperModalContext.Provider value={{ cropper }}>
			<CropperModal />
			{children}
		</CropperModalContext.Provider>
	);
}

function CropperModal() {
	const {
		cropper: {
			aspectRatio,
			url,
			open,
			crop,
			setCrop,
			zoom,
			setZoom,
			onCropComplete,
			handleSubmit,
			handleClose,
		},
	} = useContext(CropperModalContext);
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Crop and Resize</DialogTitle>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<Box
					sx={{
						width: "500px",
						height: "400px",
						backgroundColor: "background.default",
						position: "relative",
					}}
				>
					<Cropper
						image={url}
						crop={crop}
						zoom={zoom}
						aspect={aspectRatio}
						onCropChange={setCrop}
						onZoomChange={setZoom}
						onCropComplete={onCropComplete}
					></Cropper>
				</Box>
				<DialogActions
					sx={{
						width: "100%",
						boxSizing: "border-box",
						padding: "1rem",
						display: "flex",
						alignItems: "center",
						gap: "1rem",
					}}
				>
					<Typography variant="overline">Zoom</Typography>
					<Slider
						sx={{ m: "0px 3rem" }}
						value={zoom}
						min={1}
						max={3}
						step={0.1}
						aria-labelledby="Zoom"
						onChange={(_, value) => setZoom(value as number)}
					/>
					<Button onClick={handleSubmit} variant="contained">
						Save
					</Button>
					<Button onClick={handleClose} variant="contained">
						Cancel
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
}
