import { alpha, Box, Button, Typography } from "@mui/material";
import BorderedImage from "./BorderedImage";
import GetStatus from "../../TableBookStatus";
import { useContext, useEffect, useRef, useState } from "react";
import { TableContext } from "../../../../context/TableContext";
import { Buffer } from "buffer";
import CONFIG from "../../../../../config";
import IsImageValid from "../../../../hooks/useIsImageValid";

const CoverAndStatusContainer = ({
	row,
	edit,
}: {
	row: booksRowsInterface | BookPayload;
	edit?: boolean | false;
}) => {
	return (
		<Box
			sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 100 }}
		>
			<EditableImage
				row={row}
				edit={edit}
				metadataKey="cover_image"
				src={
					row.cover_image &&
					`${CONFIG.SERVER_HOST}/images/book_covers/${row.cover_image}.png`
				}
			/>
			<GetStatus edit={edit} status={row.status} row={row} />
		</Box>
	);
};

function EditableImage({
	edit,
	src,
	row,
	metadataKey,
}: {
	edit?: boolean | false;
	src: any;
	row: any;
	metadataKey: string;
}) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const { handleEditEntry } = useContext(TableContext);
	const [imageSource, setImageSource] = useState<string | undefined>();
	const [loading, setLoading] = useState(true);

	const valid = IsImageValid(src);

	useEffect(() => {
		if (edit) {
			if (valid && !row.cover_image_blob) {
				setImageSource(src);
				setLoading(false);
				return;
			}
			if (row.cover_image_blob) {
				setImageSource(row.cover_image_blob);
				setLoading(false);
			} else {
				setImageSource("");
			}
		} else {
			setLoading(!valid);
			setImageSource(src);
		}
	}, [row.cover_image_blob, src]);

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			console.log("No file selected");
			return;
		}
		const file = e.target.files[0];
		const imageUrl = URL.createObjectURL(file);

		handleEditEntry?.(row.id, `${metadataKey}_blob`, imageUrl);

		const reader = new FileReader();
		reader.onloadend = () => {
			const arrayBuffer = reader.result as ArrayBuffer;
			const buffer = Buffer.from(arrayBuffer);

			handleEditEntry?.(
				row.id,
				`${metadataKey}_buffer`,
				buffer.toString("base64")
			);
		};
		reader.onerror = (err) => {
			console.error("Error reading file:", err);
		};
		reader.readAsArrayBuffer(file);
	};

	if (edit) {
		return (
			<>
				<input
					type="file"
					ref={fileInputRef}
					style={{ display: "none" }}
					accept="image/*"
					onChange={handleUpload}
				/>
				<Button
					variant="text"
					sx={{
						position: "relative",
						width: 100,
						height: 150,
						borderRadius: 2,
						border: "2px solid",
						borderColor: "primary.main",
						backgroundSize: "cover",
						backgroundImage: imageSource ? `url(${imageSource})` : "none",
						overflow: "hidden",
						color: "transparent",
						transition: "all 0.5s ease-in-out",
						"&:before": {
							content: '""',
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							backgroundColor: " transparent",
							backgroundSize: "cover",
							transition: "all 0.3s ease-in-out",
						},
						"&:hover": {
							"&:before": {
								backgroundColor:
									"rgba(0, 0, 0, 0.5)" /* Add a semi-transparent overlay */,
								backgroundSize: "cover",
								filter: "blur(2px)",
							},
							"&:after": {
								color: "white",
							},
						},
						"&:after": {
							content: '"Upload"',
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							color: imageSource ? "transparent" : "white",
							textAlign: "center",
							transition: "all 0.3s ease-in-out",
						},
					}}
					onClick={handleButtonClick}
				></Button>
			</>
		);
	}
	return (
		<BorderedImage
			sx={{ width: 100, height: 150 }}
			src={src}
			alt="Cover"
			isLoading={loading}
		/>
	);
}

export default CoverAndStatusContainer;
