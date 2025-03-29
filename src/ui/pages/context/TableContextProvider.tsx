import { useLocation } from "react-router-dom";
import { TableContext } from "./TableContext";
import { useLayoutEffect, useState } from "react";
import { useCallNoFormatter } from "../hooks/useCallNoFormatter";
import { useQuery } from "@tanstack/react-query";
import useCollapsibleManager from "../hooks/useCollapsibleManager";
import useSelectAll from "../hooks/useSelectAll";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable"; // Import the plugin separately

const getRoles = async (): Promise<any> => {
  return await window.requestRole.getAll();
};

const getCategories = async (): Promise<any> => {
  return await window.requestCategory.getAll();
};

function TableContextProvider({ children }: { children: React.ReactNode }) {
  const [availableRoles, setAvailableRoles] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<columnsInterface[]>([]);
  const callNoFormatter = useCallNoFormatter();
  const location = useLocation();

  const selectAll = useSelectAll(rows.map((row) => row.id));
  const { setSelectedItems } = selectAll;
  const { OpenedRowIndex, handleRowClick } = useCollapsibleManager();

  const handleRemoveEntry = (id: number) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const GeneratePDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const excludedColumns = [
      "id",
      // user
      "password",
      "profile_pic",
      "role_id",
      "school_id",
      "name_updated",
      "email_updated",
      "password_updated",
      // catalog
      "cover_image",
      "category_id",
    ];
    const cols = Object.keys(rows[0]).filter(
      (key) => !excludedColumns.includes(key),
    );
    autoTable(doc, {
      head: [cols],
      body: rows.map(
        (row) => cols.map((column) => row[column]), // Extract data correctly
      ),
      styles: {
        // fontSize: 10,
        cellPadding: 5, // Adjust padding inside cells
      },
    });
    doc.save("record.pdf");
  };

  const handleEditEntry = (index: number, key: string, value: any) => {
    setRows((prevRows) =>
      prevRows.map((entry) => {
        if (entry.id === index) {
          const newEntry = { ...entry, [key]: value };
          return newEntry;
        }
        return entry;
      }),
    );
  };

  useLayoutEffect(() => {
    handleRowClick(-1);
    setSelectedItems([]);
  }, [location.pathname]);

  const handleRefetch = () => {
    refetchRoles();
    refetchCategories();
  };

  const { data: roles, refetch: refetchRoles } = useQuery<any>({
    queryKey: ["roles"],
    queryFn: () => getRoles(),
    staleTime: 0,
    refetchInterval: 1000 * 10,
  });

  const { data: categories, refetch: refetchCategories } = useQuery<any>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 0,
    refetchInterval: 1000 * 10,
  });

  useLayoutEffect(() => {
    if (roles?.success) {
      setAvailableRoles(roles.data);
    }
    if (categories?.success) {
      setAvailableCategories(categories.data);
    }
  }, [roles, categories]);

  return (
    <TableContext.Provider
      value={{
        availableRoles,
        availableCategories,
        rowData: { rows, setRows },
        columnData: { columns, setColumns },
        selectAll: selectAll,
        handleRemoveEntry,
        collapsibleManager: { OpenedRowIndex, handleRowClick },
        handleEditEntry,
        callNoFormatter,
        refetch: handleRefetch,
        GeneratePDF,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export default TableContextProvider;
