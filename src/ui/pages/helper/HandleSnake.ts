import ConverToLetterCase from "./ConvertToLetterCase";

export default function handleSnake(str: string) {
	return str
		.split("_")
		.map((x) => ConverToLetterCase(x))
		.join(" ");
}
