import { useContext, useLayoutEffect, useRef, useState } from "react";
import StyledDetailsTextfield from "../../../../books/StyledComponent/StyledDetailsTextField";
import { TableContext } from "../../../../context/TableContext";

type DetailsTextfieldProps = {
	iniitialValue: string;
	disabled: boolean;
	label: string;
	required: boolean;
	dataIndex: { id: number; key: string };
	multiline?: boolean;
	rows?: number;
	sx?: any;
	slotProps?: any;
};
const DetailsTextfield = ({
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
			setErrorMessage("This field is required");
			setError(true);
		} else {
			setError(false);
		}
		handleEdit(dataIndex.id, dataIndex.key, InputRef.current?.value);
	};

	return (
		<StyledDetailsTextfield
			onKeyDown={(e) => handleSubmit(e)}
			defaultValue={iniitialValue}
			placeholder="N/A"
			onBlur={handleBlur}
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
			helperText={error ? errorMessage : (disabled && "") || " "}
			fullWidth
		/>
	);
};

export default DetailsTextfield;
