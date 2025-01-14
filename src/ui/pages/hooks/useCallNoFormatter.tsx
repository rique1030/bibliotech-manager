import { useLayoutEffect, useState } from "react";

function useCallNoFormatter() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentFormat, setCurrentFormat] = useState<any>(formats[0]);
	useLayoutEffect(() => {
		window.storedSettings.getFormatIndex().then((value: any) => {
			setCurrentIndex(value);
		});
	}, []);

	const verifyFormat = (callNumber: string): boolean => {
		const regex = new RegExp(currentFormat.regex);
		return regex.test(callNumber);
	};

	const handleChangeFormat = (index: number) => {
		setCurrentIndex(index);
		window.storedSettings.setFormatIndex(index);
	};

	useLayoutEffect(() => {
		setCurrentFormat(formats.find((format) => format.id === currentIndex));
	}, [currentIndex]);

	return {
		verifyFormat,
		currentFormat,
		currentIndex,
		handleChangeFormat,
		formats,
	};
}

export { useCallNoFormatter };

const formats = [
	{
		id: 0,
		name: "Dewey Decimal Classification (DDC)",
		format: "###.## or ###.###",
		regex: "\\d{3}\\.\\d{2,3}",
		description:
			"Three digits indicating the subject of the book followed by a decimal point and two or three more digits for more precise classification. Example: 123.45 or 123.456.",
	},
	{
		id: 1,
		name: "Library of Congress Classification (LCC)",
		format: "XX ###.### or XX ####.##",
		regex: "[A-Z]{2} \\d{3,4}\\.\\d{2,3}",
		description:
			"The classification starts with two uppercase letters representing subject areas, followed by a space, then three or four digits indicating a specific category. This is further divided by a decimal point and two to three more digits for finer classification. Example: BL 123.45 or BL 1234.56.",
	},
	{
		id: 2,
		name: "Universal Decimal Classification (UDC)",
		format: "##.## or ###.###",
		regex: "\\d{2,3}\\.\\d{2,3}",
		description:
			"The UDC is a numeric classification which assigns a unique number to each subject, with the decimal point separating the main and sub-subject. Example: 12.34 or 123.456.",
	},
	{
		id: 3,
		name: "Colon Classification (CC)",
		format: "A:B.C:D",
		regex: "^[A-Z]:[A-Z0-9]+(\\.[A-Z0-9]+)*(\\:[A-Z0-9]+(\\.[A-Z0-9]+)*)*$",
		description:
			"The CC is a faceted classification system, using punctuation like colons and periods to divide the subject and sub-subject. The regex expects the format to start with an uppercase letter, followed by a colon, then alphanumeric characters, optionally followed by dot-separated sub-facets or more colon-separated facets. Example: A:B.C:D or A:B.C:123.",
	},
	{
		id: 4,
		name: "Personal Author Call Numbers",
		format: "Author's Last Name, First Name",
		regex: "[A-Z][a-z]+, [A-Z][a-z]+",
		description:
			"This call number system uses the author's surname or the first significant word of the title. The regex expects the format to start with an uppercase letter, followed by lowercase letters, then a comma and a space, then an uppercase letter followed by lowercase letters. Example: Doe, John or Smith, Jane.",
	},
	{
		id: 5,
		name: "Book Number / Cutter Classification",
		format: "#... or Cutter's number",
		regex: "[A-Z]\\d{1,2}",
		description:
			"This is a combination of the Dewey or LC classification with a Cutter number, which is a three-character alphanumeric code. The first character is a letter, followed by one or two digits.",
	},
	{
		id: 7,
		name: "British Library System",
		format: "##.## or ###.###",
		regex: "\\d{2,3}\\.\\d{2,3}",
		description:
			"Similar to the Dewey Decimal Classification, the British Library System uses a combination of two or three digits for the main subject and two or three digits for the sub-subject, separated by a decimal point. Example: 12.34 or 123.456.",
	},
	{
		id: 8,
		name: "Melvil Decimal Classification (MDC)",
		format: "###.## or ###.###",
		regex: "\\d{3}\\.\\d{2,3}",
		description:
			"The MDC is a faceted classification system, using punctuation like periods to divide the subject and sub-subject. The regex expects the format to start with three digits, followed by a decimal point and two or three more digits for finer classification. Example: 123.45 or 123.456.",
	},
	{
		id: 9,
		name: "NLM Classification",
		format: "WZ",
		regex: "[A-Z]{2}",
		description:
			"The NLM Classification is used by the National Library of Medicine in the United States. The call number is a combination of two letters, with the first letter indicating the subject area and the second letter indicating the sub-subject. Example: WZ for the history of medicine.",
	},
	{
		id: 14,
		name: "Any",
		format: "Any",
		regex: ".*",
		description:
			"This call number format accepts any input, without validation.",
	},
];
