import TableData from "../TableData";
import TableDataCollapsible from "../TableDataCollapsible";
import { Fragment, useContext, useEffect } from "react";
import BooksDataCollapsible from "./BooksCollapsible/BooksDataCollapsible";
import { TableContext } from "../../../context/TableContext";
import { TableBody } from "@mui/material";

interface booksDataInterface {
	selectable?: boolean | false;
	removable?: boolean | false;
	edit?: boolean | false;
	add?: boolean | false;
}

const BooksData = ({
	selectable,
	removable,
	edit,
	add,
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
							onClick={() => handleRowClick(index)}
							selectable={selectable}
							removable={removable}
							index={index}
							row={row}
							add={add}
						/>
						<TableDataCollapsible
							openedRowIndex={OpenedRowIndex}
							index={index}
						>
							<BooksDataCollapsible edit={edit} row={row} />
						</TableDataCollapsible>
					</Fragment>
				);
			})}
		</TableBody>
	);
};

export default BooksData;
