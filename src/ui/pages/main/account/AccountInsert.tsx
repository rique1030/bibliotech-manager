import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import { useContext, useLayoutEffect } from "react";
import { Divider } from "@mui/material";
import columns from "../../components/Table/columns/account/insert";
import TableHeader from "../../components/Table/TableHeader";
import { TableContext } from "../../context/TableContext";
import { useInsert } from "../../hooks/useInsert";
import { TableInsertContext } from "../../context/TableInsertContext";
import AccountsData from "../../components/Table/Accounts/AccountsData";
import InsertFooter from "../../components/insert/Footer";
import { getRoute, routes } from "../../Router";

const insertData = async (payload: InsertUsersPayload): Promise<any> => {
  return await window.requestUser.insertMultiple(payload);
};

const field = ["first_name", "last_name", "email", "role_id"];

function AccountInsert() {
  const {
    rowData: { rows, setRows },
    columnData: { setColumns },
    refetch,
  } = useContext(TableContext);

  const payload = {
    entries: rows,
  };

  const options = {
    url: getRoute(routes.ACCOUNTS.VIEW), //accounts/manage-accounts
    field,
    payload: payload,
  };

  const useinsert = useInsert({ insertData, options });
  const {
    confirmationModal: { ConfirmationModal },
  } = useinsert;

  useLayoutEffect(() => {
    refetch();
    setColumns(columns);
    (async () => {
      setRows([
        {
          id: 0,
          profile_pic: "",
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          school_id: null,
          role_id: "U5ER",
          is_verified: true,
          created_at: null,
        },
      ]);
    })();
  }, []);

  return (
    <TableInsertContext.Provider value={{ useinsert }}>
      {ConfirmationModal}
      <MainContainer>
        <ViewTable>
          <TableHeader indented />
          <AccountsData removable edit />
        </ViewTable>
        <Divider />
        <Footer />
      </MainContainer>
    </TableInsertContext.Provider>
  );
}

export default AccountInsert;

function Footer() {
  const {
    useinsert: { handleInsert, isInserting },
  } = useContext(TableInsertContext);
  const {
    rowData: { rows, setRows },
  } = useContext(TableContext);

  const handleAddEntry = async () => {
    const newId = rows.length;
    const newRow = {
      id: newId,
      profile_pic: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      school_id: null,
      role_id: 2,
      is_verified: true,
      created_at: null,
    };
    setRows([...rows, newRow]);
  };
  return (
    <InsertFooter
      length={rows.length}
      handleAddEntry={handleAddEntry}
      handleInsert={handleInsert}
      isInserting={isInserting}
      type="Account"
    />
  );
}
