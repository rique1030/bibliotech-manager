import { useLayoutEffect, useState } from "react";

const verifyAccessNumber = async (payload: string[]): Promise<any> => {
	return await window.requestBook.getByAccessNumber(payload);
};

function useGenerateAccessNumber(edit: boolean) {
	const [generatedAccessNumber, setGeneratedAccessNumber] = useState("");

	useLayoutEffect(() => {
		if (!edit) return;
		generateAccessNumber().then((data) => {
			setGeneratedAccessNumber(data);
		});
	}, []);

	const generateAccessNumber = async () => {
		const generateRandomAccessNumber = () => {
			const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			let accessNumber = "";
			for (let i = 0; i < 10; i++) {
				accessNumber += CHARACTERS.charAt(
					Math.floor(Math.random() * CHARACTERS.length)
				);
			}
			return accessNumber;
		};

		const checkAccessNumberExist = async (
			accessNumber: string
		): Promise<boolean> => {
			try {
				const response = verifyAccessNumber([accessNumber]);
				response.then((data) => {
					return data.success && data.data > 0;
				});
			} catch (error) {
				return false;
			}
			return false;
		};

		let accessnumber = generateRandomAccessNumber();

		while (await checkAccessNumberExist(accessnumber)) {
			accessnumber = generateRandomAccessNumber();
		}

		return accessnumber;
	};

	return { generatedAccessNumber };
}

export default useGenerateAccessNumber;
