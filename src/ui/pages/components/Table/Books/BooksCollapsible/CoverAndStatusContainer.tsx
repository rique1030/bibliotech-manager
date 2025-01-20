import { alpha, Box, Button, Typography } from "@mui/material";
import BorderedImage from "./BorderedImage";
import GetStatus from "../../TableBookStatus";
import { useContext, useEffect, useRef, useState } from "react";
import { TableContext } from "../../../../context/TableContext";
import { Buffer } from "buffer";
import CONFIG from "../../../../../config";
import IsImageValid from "../../../../hooks/useIsImageValid";
import CroperModalProvider, {
	CropperModalContext,
} from "../../../CropperModal";
import useUploadImage from "../../../../hooks/useUploadImage";
import ImageButton from "../../../StyledComponent/ImageButton";
import { convertCover } from "../../../../../utils/ImageHelper";

const CoverAndStatusContainer = ({
	row,
	edit,
}: {
	row: any;
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
				src={row.cover_image && convertCover(row.cover_image)}
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
	const {
		imageSource,
		loading,
		handleButtonClick,
		handleUpload,
		fileInputRef,
	} = useUploadImage({
		aspectRatio: 1 / 1.5,
		edit: edit || false,
		src: src,
		image_blob: row.cover_image_blob,
		metadata: { key: "cover_image", id: row.id },
	});

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
				<ImageButton
					variant="outlined"
					sx={{
						width: 100,
						height: 150,
						"&:before": {
							backgroundImage: imageSource ? `url(${imageSource})` : "none",
						},
					}}
					onClick={handleButtonClick}
				>
					UPLOAD
				</ImageButton>
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
