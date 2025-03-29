import { useContext, useLayoutEffect, useRef, useState } from "react";
import StyledDetailsTextfield from "../StyledComponent/StyledDetailsTextField";
import { TableContext } from "../../context/TableContext";
import PasswordTextField from "../PasswordTextField";
import {
  validateEmail,
  validateID,
  validatePassword,
} from "../../helper/Verify";

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

  // Allows to submit the form by pressing Enter
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
    try {
      switch (dataIndex.key) {
        case "call_number":
          if (!verifyCallNumber(text)) throw new Error("Invalid call number format");
          break;
        case "email":
          validateEmail(text);
          break;
        case "password":
          validatePassword(text);
          break;
        case "school_id":
          validateID(text);
          break;
        default:
          break;
      }
      setError(false);
      return true;
    } catch (error: any) {
      setError(true);
      return false;
    }
    setError(required || false);
    return !required;
  };


  const handleRequired = () => {
    setError(InputRef.current?.value.trim() === "");
    handleEdit(dataIndex.id, dataIndex.key, InputRef.current?.value);
  };

  useLayoutEffect(() => {
    if (disabled) return;
    verifyTextContent();
  }, [currentFormat]);

  const password_field = (
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
      size="small"
      sx={sx}
      error={error && !disabled}
      slotProps={slotProps}
      // helpertext={error ? errorMessage : (disabled && "") || ""}
      fullWidth
    />
  );
  const text_field = (
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
      fullWidth
    />
  );
  return type === "password" ? password_field : text_field;
};

export default DetailsTextfield;

// function CheckContent(text: string, key: string, required: Boolean) {
//   try {
//     if (!text) return !required;
//     switch (key) {
//       case "call_number":
//         if (!verifyCallNumber(text))
//           throw new Error("Invalid call number format");
//         break;
//       case "email":
//         validateEmail(text);
//         break;
//       case "password":
//         validatePassword(text);
//         break;
//       case "school_id":
//         validateID(text);
//         break;
//     }
//     return true;
//   } catch {
//     return false;
//   }
// }

// const verifyTextContent = () => {
//   const text = InputRef.current?.value;
//   if (!text) return !required;
//   try {
//     switch (dataIndex.key) {
//       case "call_number":
//         if (!verifyCallNumber(text))
//           throw new Error("Invalid call number format");
//         break;
//       case "email":
//         validateEmail(text);
//         break;
//       case "password":
//         validatePassword(text);
//         break;
//       case "school_id":
//         validateID(text);
//         break;
//       default:
//         break;
//     }
//     return true;
//   } catch (error: any) {
//     return false;
//   }
// };
