import { useRef, useState } from "react";
import getCroppedImg from "../../utils/CroppedImages";

export default function useCropperModal() {
	const [open, setOpen] = useState(false);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [aspectRatio, setAspectRatio] = useState<number>(1);
	const [url, setUrl] = useState<string>("");
	const promiseResolver =
		useRef<
			(
				value:
					| { imgString: string | null; blob: Blob | null }
					| PromiseLike<{ imgString: string | null; blob: Blob | null }>
			) => void
		>();
	const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const showCropperModal = (
		aspectRatio: number,
		imageSrc: string
	): Promise<{ imgString: string | null; blob: Blob | null }> => {
		setAspectRatio(aspectRatio);
		if (!imageSrc) return Promise.resolve({ imgString: null, blob: null });
		setUrl(imageSrc);
		return new Promise((resolve) => {
			promiseResolver.current = resolve;
			setOpen(true);
		});
	};

	const handleSubmit = async () => {
		try {
			if (!croppedAreaPixels) {
				console.warn("No cropped area pixels");
				promiseResolver.current?.({ imgString: null, blob: null });
				return;
			}
			const newCroppedImage = await getCroppedImg(url, croppedAreaPixels);
			promiseResolver.current?.(newCroppedImage);
			setOpen(false);
		} catch (error) {
			console.error(error);
		}
	};

	const handleClose = () => {
		setOpen(false);
		promiseResolver.current?.({ imgString: null, blob: null });
	};

	return {
		aspectRatio,
		url,
		open,
		crop,
		setCrop,
		zoom,
		setZoom,
		onCropComplete,
		showCropperModal,
		handleSubmit,
		handleClose,
	};
}
