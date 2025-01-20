import TableData from "../TableData";
import TableDataCollapsible from "../TableDataCollapsible";
import { Fragment, useContext } from "react";
import { TableContext } from "../../../context/TableContext";
import { TableBody } from "@mui/material";
import AccountsDataCollapsible from "./AccountsCollapsible/AccountsDataCollapsible";

interface AccountsDataInterface {
	selectable?: boolean | false;
	removable?: boolean | false;
	isEditable?: boolean | false;
}

export default function AccountsData({
	selectable,
	removable,
	isEditable,
}: AccountsDataInterface) {
	const {
		rowData: { rows },
		collapsibleManager: { OpenedRowIndex, handleRowClick },
	} = useContext(TableContext);
	return (
		<TableBody>
			{rows.map((row, index) => {
				return (
					<Fragment key={row.id}>
						<TableData
							onClick={() => handleRowClick(index)}
							selectable={selectable}
							removable={removable}
							index={index}
							row={row}
						/>
						<TableDataCollapsible openedRowIndex={OpenedRowIndex} index={index}>
							<AccountsDataCollapsible isEditable={isEditable} row={row} />
						</TableDataCollapsible>
					</Fragment>
				);
			})}
		</TableBody>
	);
}
