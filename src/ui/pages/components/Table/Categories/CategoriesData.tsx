import TableData from "../TableData";
import TableDataCollapsible from "../TableDataCollapsible";
import { Fragment, useContext } from "react";
// import BooksDataCollapsible from "./BooksCollapsible/BooksDataCollapsible";
import { TableContext } from "../../../context/TableContext";
import { TableBody } from "@mui/material";
import CategoriesDataCollapsible from "./CategoriesCollapsible/CategoriesDataCollapsible";

interface CategoriesDataInterface {
	selectable?: boolean | false;
	removable?: boolean | false;
	isEditable?: boolean | false;
}

const CategoriesData = ({
	selectable,
	removable,
	isEditable,
}: CategoriesDataInterface) => {
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
							<CategoriesDataCollapsible isEditable={isEditable} row={row} />
						</TableDataCollapsible>
					</Fragment>
				);
			})}
		</TableBody>
	);
};

export default CategoriesData;
