import React, { useEffect } from "react";

const useIsImageValid = (src: string) => {
	if (!src) return false;
	const [isValid, setIsValid] = React.useState<boolean>(false);
	const checkImage = React.useCallback(async () => {
		try {
			const response = await fetch(src, { method: "HEAD" });
			if (response.ok) {
				const contentType = response.headers.get("Content-Type");
				return !!contentType?.startsWith("image/");
			}
		} catch {
			return false;
		}
	}, [src]);

	useEffect(() => {
		checkImage().then((result) => setIsValid(result || false));
	}, [checkImage]);

	return !isValid;
};
export default useIsImageValid;
