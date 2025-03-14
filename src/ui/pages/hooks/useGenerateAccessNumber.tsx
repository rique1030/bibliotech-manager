import { useLayoutEffect, useState } from "react";

const verifyAccessNumber = async (payload: string[]): Promise<any> => {
	return await window.requestCopy.getByAccessNumber(payload);
};

function useGenerateAccessNumber() {
	const generateUniqueNumber = async () => {
		const data = await generateAccessNumber();
		return data;
	};

	useLayoutEffect(() => {
		generateUniqueNumber();
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

	return { generateAccessNumber };
}

export default useGenerateAccessNumber;
