import TableData from "../TableData";
import TableDataCollapsible from "../TableDataCollapsible";
import { Fragment, useContext } from "react";
import BooksDataCollapsible from "./BooksCollapsible/BooksDataCollapsible";
import { TableContext } from "../../../context/TableContext";
import { TableBody } from "@mui/material";

interface booksDataInterface {
	selectable?: boolean | false;
	removable?: boolean | false;
	isEditable?: boolean | false;
}

const BooksData = ({
	selectable,
	removable,
	isEditable,
}: booksDataInterface) => {
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
							key={`${row.id}-data`}
							onClick={() => handleRowClick(index)}
							selectable={selectable}
							removable={removable}
							index={index}
							row={row}
						/>
						<TableDataCollapsible
							key={`${row.id}-collapsible`}
							openedRowIndex={OpenedRowIndex}
							index={index}
						>
							<BooksDataCollapsible isEditable={isEditable} row={row} />
						</TableDataCollapsible>
					</Fragment>
				);
			})}
		</TableBody>
	);
};

export default BooksData;
