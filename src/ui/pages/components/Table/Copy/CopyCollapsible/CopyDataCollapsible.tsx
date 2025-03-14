import Box from "@mui/material/Box/Box";
import CollapsibleCotainer from "../../../StyledComponent/CollapsibleContainer";
import DetailsTextfield from "../../DetailsTextField";
import GetStatus from "../../TableBookStatus";
import BorderedImage from "../../Books/BooksCollapsible/BorderedImage";
import { convertQRCode } from "../../../../../utils/ImageHelper";
import useIsImageValid from "../../../../hooks/useIsImageValid";

const CopyDataCollapsible = ({ row, edit }: {
	row: booksRowsInterface | BookPayload;
	edit?: boolean;
}) => {
	const valid = useIsImageValid(convertQRCode((row?.access_number)));
	return (
		<CollapsibleCotainer>
			<Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
			{
				!edit && (
				<BorderedImage
					src={convertQRCode((row?.access_number))}
					alt="QR Code"
					sx={{ width: "5rem", height: "5rem" }}
					isLoading={valid}
				/>
			)
			}
            <DetailsTextfield
				disabled={true}
				label="Title"
				iniitialValue={row.title}
				required={false}
				dataIndex={{ id: row.id, key: "title" }}
            />
            <DetailsTextfield
							disabled={true}
							label="Author"
							iniitialValue={row.author}
							required={false}
							dataIndex={{ id: row.id, key: "author" }}
            />
            <DetailsTextfield
							disabled={!edit}
							label="Access Number"
							iniitialValue={row.access_number}
							required={edit || false}
							dataIndex={{ id: row.id, key: "access_number" }}
            />
                <GetStatus row={row} status={row.status} edit={edit} />
            </Box>
		</CollapsibleCotainer>
	);
};
export default CopyDataCollapsible;
