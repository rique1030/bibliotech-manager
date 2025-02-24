import DetailsContainer from "../../../StyledComponent/DetailsContainer";
import TextFieldContainer from "../../../StyledComponent/TextFieldContainer";
import DetailsTextfield from "../../DetailsTextField";

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
					label="Call Number"
					iniitialValue={row.call_number}
					required={isEditable || false}
					dataIndex={{ id: row.id, key: "call_number" }}
				/>
				<DetailsTextfield
					disabled={!isEditable}
					label="Publisher"
					iniitialValue={row.publisher || ""}
					required={isEditable || false}
					dataIndex={{ id: row.id, key: "publisher" }}
				/>
			</TextFieldContainer>
		</DetailsContainer>
	);
};

export default TopDescriptionContainer;
