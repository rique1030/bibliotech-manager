import { useContext, useEffect, useRef, useState } from "react";
import { TableContext } from "../context/TableContext";
import { CropperModalContext } from "../components/CropperModal";
import useIsImageValid from "./useIsImageValid";
import { Buffer } from "buffer";
interface useUploadImageProps {
	aspectRatio: number;
	edit: boolean | false;
	src: string | "";
	image_blob: string | "";
	metadata: { key: string; id: number };
}

export default function useUploadImage({
	aspectRatio = 1,
	edit = false,
	src = "",
	image_blob = "",
	metadata,
}: useUploadImageProps) {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const { handleEditEntry } = useContext(TableContext);
	const {
		cropper: { showCropperModal },
	} = useContext(CropperModalContext);

	const valid: boolean = useIsImageValid(src);
	const [imageSource, setImageSource] = useState<string | undefined>();
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		if (edit) {
			if (image_blob) {
				setImageSource(image_blob);
			} else if (valid) {
				setImageSource(src);
			} else {
				setImageSource("");
			}
			setLoading(false);
			return;
		} 
		setImageSource(src);
		setLoading(!valid);
	}, [image_blob, src, edit]);

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			console.warn("No file selected");
			return;
		}
		const file = e.target.files[0];
		const imageUrl = URL.createObjectURL(file);

		const croppedImage = await showCropperModal(aspectRatio, imageUrl);

		handleEditEntry?.(
			metadata.id,
			`${metadata.key}_blob`,
			croppedImage.imgString
		);

		const reader = new FileReader();
		reader.onloadend = () => {
			const arrayBuffer = reader.result as ArrayBuffer;
			const buffer = Buffer.from(arrayBuffer);

			handleEditEntry?.(
				metadata.id,
				`${metadata.key}_buffer`,
				buffer.toString("base64")
			);
		};
		reader.onerror = (err) => {
			console.error("Error reading file:", err);
		};
		reader.readAsArrayBuffer(croppedImage.blob as Blob);
	};
	return {
		imageSource,
		loading,
		handleButtonClick,
		handleUpload,
		fileInputRef,
	};
}
