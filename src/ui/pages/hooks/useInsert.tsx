import { useMutation } from "@tanstack/react-query";
import { useConfirmationModal } from "../components/ConfirmationModal";
import VerifyRequiredFields from "../helper/VerifyRequiredFields";
import { useContext } from "react";
import { TableContext } from "../context/TableContext";
import { AlertContext } from "../context/AlertContext";
import { validateEmail } from "../helper/Verify";

export function useInsert({ insertData, options }: any) {
  const { resultAlert } = useContext(AlertContext);
  const {
    rowData: { setRows },
    callNoFormatter: { verifyFormat },
  } = useContext(TableContext);
  const { showTimedAlert } = resultAlert;
  const confirmationModal = useConfirmationModal();

  const mutation = useMutation({
    mutationFn: (payload) => insertData(payload),
    onSuccess: (data: any) => {
      if (data && data.success) {
        showTimedAlert("success", data.message);
        setRows([]);
      } else {
        showTimedAlert("error", data.error);
      }
    },
    onError: (error) => {
      console.error(error);
      showTimedAlert(
        "error",
        error?.message || "An error occurred. Please try again later.",
      );
    },
  });

  const CleanInsertCopy = (payload: any) => {
    if (!payload) return [];
    if (!payload[0].hasOwnProperty("catalog_id")) return payload;
    return payload.map((entry: any) => {
      return Object.entries(entry).reduce(
        (acc, [key, value]) =>
          key !== "title" && key !== "author" ? { ...acc, [key]: value } : acc,
        {} as any,
      );
    });
  };

  const handleInsert = async () => {
    console.log(options.payload.entries);
    if (!VerifyRequiredFields(options.field, options.payload.entries)) {
      showTimedAlert("error", "All fields are required");
      return;
    }
    if (!verifyBooks(options.payload.entries)) {
      showTimedAlert("error", "Call number is not in correct format");
      return;
    }
    if (!verifyRoles(options.payload.entries)) {
      showTimedAlert(
        "error",
        "Default roles (Admin and User) are reserved and cannot be modified.",
      );
      return;
    }
    if (!verifyEmails(options.payload.entries)) {
      return;
    }
    const allow = await confirmationModal.showConfirmationModal();
    if (allow) {
      const newPayload = CleanInsertCopy(options.payload.entries);
      const filteredPayload = newPayload.map((entry: any) =>
        Object.entries(entry).reduce(
          (acc, [key, value]) =>
            !key.includes("blob") ? { ...acc, [key]: value } : acc,
          {} as any,
        ),
      );
      mutation.mutate(JSON.parse(JSON.stringify(filteredPayload)));
    }
  };

  const verifyRoles = (entries: any[]) => {
    for (const entry of entries) {
      if (entry && entry.role_name && entry.hasOwnProperty("account_view")) {
        const isNotValid =
          entry.role_name == "Admin" || entry.role_name == "User";
        if (isNotValid) {
          return false;
        }
      }
    }
    return true;
  };

  const verifyBooks = (entries: any[]) => {
    for (const entry of entries) {
      if (entry && entry.call_number) {
        const isValid = verifyFormat(entry.call_number);
        if (!isValid) {
          return false;
        }
      }
    }
    return true;
  };

  const verifyEmails = (entries: any[]) => {
    for (const entry of entries) {
      if (entry && entry.email) {
        try {
          return validateEmail(entry.email);
        } catch (error: any) {
          showTimedAlert("error", error.message);
          return false;
        }
      }
    }
    return true;
  };

  return {
    handleInsert,
    resultAlert,
    confirmationModal,
    isInserting: mutation.isPending,
  };
}
