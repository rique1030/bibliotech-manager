import DetailsContainer from "../../../StyledComponent/DetailsContainer";
import TextFieldContainer from "../../../StyledComponent/TextFieldContainer";
import DetailsTextfield from "../../DetailsTextField";

interface TopDescriptionContainerProps {
	row: booksRowsInterface | BookPayload;
	edit?: boolean;
}

const TopDescriptionContainer = ({
	row,
	edit = false,
}: TopDescriptionContainerProps) => {
	return (
		<DetailsContainer>
			<TextFieldContainer>
				<DetailsTextfield
					disabled={!edit}
					label="Title"
					iniitialValue={row.title}
					required={edit || false}
					dataIndex={{ id: row.id, key: "title" }}
				/>
				<DetailsTextfield
					disabled={!edit}
					label="Author"
					iniitialValue={row.author}
					required={edit || false}
					dataIndex={{ id: row.id, key: "author" }}
				/>
			</TextFieldContainer>
			<TextFieldContainer>
				<DetailsTextfield
					disabled={!edit}
					label="Call Number"
					iniitialValue={row.call_number}
					required={edit || false}
					dataIndex={{ id: row.id, key: "call_number" }}
				/>
				<DetailsTextfield
					disabled={!edit}
					label="Publisher"
					iniitialValue={row.publisher || ""}
					required={edit || false}
					dataIndex={{ id: row.id, key: "publisher" }}
				/>
			</TextFieldContainer>
		</DetailsContainer>
	);
};

export default TopDescriptionContainer;
