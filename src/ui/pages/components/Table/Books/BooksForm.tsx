import TableDataCollapsible from "../TableDataCollapsible";
import { Fragment } from "react";
import BooksDataCollapsible from "./BooksCollapsible/BooksDataCollapsible";
import { TableCell, TableRow } from "@mui/material";
import RemoveButton from "../../RemoveButton";
const BooksForm = ({
	// rows,
	// handleRemoveEntry,
	// onRowClick,
	// openedRowIndex,
	isEditable,
}: // handleEditEntry,
booksDataInterface) => {
	return (
		<>
			{rows.map((row, index) => (
				<Fragment key={index}>
					<BooksFormBar id={row.id} handleRemoveEntry={handleRemoveEntry} />
					<TableDataCollapsible index={index}>
						<BooksDataCollapsible
							handleEditEntry={handleEditEntry}
							isEditable={isEditable}
							row={row}
						/>
					</TableDataCollapsible>
				</Fragment>
			))}
		</>
	);
};

type BooksFormBarProps = {
	handleRemoveEntry: ((id: number) => void) | undefined;
	id: number;
};

const BooksFormBar = ({ handleRemoveEntry, id }: BooksFormBarProps) => {
	return (
		<TableRow>
			<TableCell sx={{ p: 1, backgroundColor: "primary.main" }}>
				<RemoveButton row={id} handleRemoveEntry={handleRemoveEntry} />
			</TableCell>
		</TableRow>
	);
};

export default BooksForm;
