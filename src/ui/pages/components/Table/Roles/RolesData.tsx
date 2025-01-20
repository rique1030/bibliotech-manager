import TableData from "../TableData";
import TableDataCollapsible from "../TableDataCollapsible";
import { Fragment, useContext } from "react";
import { TableContext } from "../../../context/TableContext";
import { TableBody } from "@mui/material";
import RolesDataCollapsible from "./RolesCollapsible/RolesDataCollapsible";

interface RolesDataInterface {
	selectable?: boolean | false;
	removable?: boolean | false;
	isEditable?: boolean | false;
}

export default function RolesData({
	selectable,
	removable,
	isEditable,
}: RolesDataInterface) {
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
							<RolesDataCollapsible isEditable={isEditable} row={row} />
						</TableDataCollapsible>
					</Fragment>
				);
			})}
		</TableBody>
	);
}
