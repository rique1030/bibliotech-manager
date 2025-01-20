import DetailsContainer from "../../../StyledComponent/DetailsContainer";
import TextFieldContainer from "../../../StyledComponent/TextFieldContainer";
import DetailsTextfield from "../../DetailsTextField";
import BorderedImage from "./BorderedImage";
import CONFIG from "../../../../../config";
import { convertQRCode } from "../../../../../utils/ImageHelper";

interface TopDescriptionContainerProps {
	row: booksRowsInterface | BookPayload;
	isEditable?: boolean;
}

const TopDescriptionContainer = ({
	row,
	isEditable = false,
}: TopDescriptionContainerProps) => {
	return (
		<DetailsContainer>
			<TextFieldContainer>
				<DetailsTextfield
					disabled={!isEditable}
					label="Access No"
					iniitialValue={row.access_number}
					required={isEditable || false}
					dataIndex={{ id: row.id, key: "access_number" }}
				/>
				<DetailsTextfield
					disabled={!isEditable}
					label="Call No"
					iniitialValue={row.call_number}
					required={isEditable || false}
					dataIndex={{ id: row.id, key: "call_number" }}
				/>
			</TextFieldContainer>
			<TextFieldContainer>
				<DetailsTextfield
					disabled={!isEditable}
					label="Title"
					iniitialValue={row.title}
					required={isEditable || false}
					dataIndex={{ id: row.id, key: "title" }}
				/>
				<DetailsTextfield
					disabled={!isEditable}
					label="Author"
					iniitialValue={row.author}
					required={isEditable || false}
					dataIndex={{ id: row.id, key: "author" }}
				/>
			</TextFieldContainer>
			<TextFieldContainer>
				<DetailsTextfield
					disabled={!isEditable}
					label="Publisher"
					iniitialValue={row.publisher || ""}
					required={isEditable || false}
					dataIndex={{ id: row.id, key: "publisher" }}
				/>
				{!isEditable && (
					<DetailsTextfield
						label="Date Added"
						iniitialValue={
							row.date_added
								? row.date_added instanceof Date
									? row.date_added.toString()
									: row.date_added
								: "N/A"
						}
						required={false}
						dataIndex={{ id: row.id, key: "date_added" }}
						disabled
					/>
				)}
			</TextFieldContainer>
			{!isEditable && (
				<BorderedImage
					src={convertQRCode(row.qrcode)}
					alt="QR Code"
					sx={{ width: 85, height: 85 }}
					isLoading={false}
				/>
			)}
		</DetailsContainer>
	);
};

export default TopDescriptionContainer;
