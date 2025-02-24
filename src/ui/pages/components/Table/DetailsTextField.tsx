import { useContext, useLayoutEffect, useRef, useState } from "react";
import StyledDetailsTextfield from "../StyledComponent/StyledDetailsTextField";
import { TableContext } from "../../context/TableContext";
import { PasswordOutlined } from "@mui/icons-material";
import PasswordTextField from "../PasswordTextField";

type DetailsTextfieldProps = {
	maxLength?: number | 255;
	minLength?: number | 0;
	iniitialValue: string;
	disabled: boolean;
	label: string;
	required?: boolean | false;
	dataIndex: { id: number; key: string };
	multiline?: boolean;
	rows?: number;
	sx?: any;
	slotProps?: any;
	type?: string;
};
const DetailsTextfield = ({
	maxLength,
	minLength,
	type = "text",
	iniitialValue,
	disabled,
	label,
	required,
	dataIndex,
	multiline,
	rows,
	sx,
	slotProps,
}: DetailsTextfieldProps) => {
	const {
		handleEditEntry: handleEdit,
		callNoFormatter: { verifyFormat: verifyCallNumber, currentFormat },
	} = useContext(TableContext);

	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const InputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (event: any) => {
		if (
			event.key === "Enter" &&
			!event.shiftKey &&
			!event.altKey &&
			!event.ctrlKey &&
			!event.metaKey
		)
			handleBlur();
	};

	const handleBlur = () => {
		if (required) {
			handleRequired();
			verifyTextContent();
		} else {
			handleEdit(dataIndex.id, dataIndex.key, InputRef.current?.value);
		}
	};

	const verifyTextContent = () => {
		const text = InputRef.current?.value;
		if (!text) return !required;
		if (dataIndex.key === "call_number") {
			const result = verifyCallNumber(text);
			setErrorMessage("Invalid call number format");
			setError(!result);
			return result;
		}
		return !required;
	};

	useLayoutEffect(() => {
		if (disabled) return;
		verifyTextContent();
	}, [currentFormat]);

	const handleRequired = () => {
		if (InputRef.current?.value.trim() === "") {
			setErrorMessage("");
			setError(true);
		} else {
			setError(false);
		}
		handleEdit(dataIndex.id, dataIndex.key, InputRef.current?.value);
	};
	if (type === "password")
		return (
			<PasswordTextField
				onKeyDown={(e: any) => handleSubmit(e)}
				placeholder="N/A"
				onBlur={handleBlur}
				defaultValue={iniitialValue}
				inputRef={InputRef}
				label={label}
				required={required}
				disabled={disabled}
				multiline={multiline || false}
				rows={rows || 1}
				sx={sx}
				error={error && !disabled}
				slotProps={slotProps}
				helpertext={error ? errorMessage : (disabled && "") || ""}
				fullWidth
			/>
		);
	return (
		<StyledDetailsTextfield
			type={type}
			onKeyDown={(e) => handleSubmit(e)}
			placeholder="N/A"
			onBlur={handleBlur}
			defaultValue={iniitialValue}
			inputRef={InputRef}
			size="small"
			label={label}
			required={required}
			disabled={disabled}
			multiline={multiline || false}
			rows={rows || 1}
			sx={sx}
			error={error && !disabled}
			slotProps={slotProps}
			helperText={error ? errorMessage : (disabled && "") || ""}
			fullWidth
		/>
	);
};

export default DetailsTextfield;
