import TableData from "../TableData";
import TableDataCollapsible from "../TableDataCollapsible";
import { Fragment, useContext } from "react";
// import CopyDataCollapsible from "./BooksCollapsible/CopyDataCollapsible";
import { TableContext } from "../../../context/TableContext";
import { TableBody } from "@mui/material";
import CopyDataCollapsible from "./CopyCollapsible/CopyDataCollapsible";

const CopyData = ({edit = false} : {edit?: boolean}) => {
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
							index={index}
							row={row}
						/>
						<TableDataCollapsible
							openedRowIndex={OpenedRowIndex}
							index={index}
						>
							<CopyDataCollapsible edit={edit} row={row} />
						</TableDataCollapsible>
					</Fragment>
				);
			})}
		</TableBody>
	);
};

export default CopyData;
