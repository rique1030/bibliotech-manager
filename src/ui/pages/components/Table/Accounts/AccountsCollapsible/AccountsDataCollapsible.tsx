import Box from "@mui/material/Box";
import CollapsibleCotainer from "../../../StyledComponent/CollapsibleContainer";
import DetailsTextfield from "../../DetailsTextField";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import styled from "@mui/system/styled";
import Tooltip from "@mui/material/Tooltip";
import VerifiedIcon from "@mui/icons-material/Verified";
import useUploadImage from "../../../../hooks/useUploadImage";
import ImageButton from "../../../StyledComponent/ImageButton";
import BorderedImage from "../../Books/BooksCollapsible/BorderedImage";
import { alpha } from "@mui/material";
import { useContext } from "react";
import { TableContext } from "../../../../context/TableContext";
import { convertProfile } from "../../../../../utils/ImageHelper";
import RoleChip from "../../RoleChip";

type Props = {
	row: any;
	edit?: boolean;
};

export default function AccountsDataCollapsible({ row, edit }: Props) {
	return (
		<CollapsibleCotainer>
			<Box
				component={Paper}
				elevation={0}
				sx={{
					display: "flex",
					justifyContent: "center",
					gap: 2,
					width: "100%",
				}}>
				<UploadImageButton edit={edit} row={row} />
				<DetailsContainer edit={edit} row={row} />
			</Box>
		</CollapsibleCotainer>
	);
}

const Container1 = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
	width: "6rem",
	minWidth: "6rem",
}));

function UploadImageButton({
	edit,
	row,
}: {
	edit?: boolean | false;
	row: any;
}) {
	const {
		imageSource,
		loading,
		handleButtonClick,
		handleUpload,
		fileInputRef,
	} = useUploadImage({
		aspectRatio: 1,
		edit: edit || false,
		src: row.profile_pic && convertProfile(row.profile_pic),
		image_blob: row.profile_pic_blob,
		metadata: { key: "profile_pic", id: row.id },
	});

	const uploadButton = (
		<Container1>
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: "none" }}
				accept="image/*"
				onChange={handleUpload}
			/>
			<ImageButton
				sx={{
					width: "6rem",
					height: "6rem",
					"&:before": {
						backgroundImage: imageSource ? `url(${imageSource})` : "none",
					},
				}}
				onClick={handleButtonClick}
				variant="outlined">
				UPLOAD
			</ImageButton>
		</Container1>
	);
	console.log(convertProfile(row.profile_pic));
	const displayImage = (
		<BorderedImage
			sx={{ width: "6rem", height: "6rem" }}
			src={imageSource || (row.profile_pic && convertProfile(row.profile_pic))}
			isLoading={loading}
			alt="Profile"
		/>
	);
	return edit ? uploadButton : displayImage;
}

const Container = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
	gap: "1.5rem",
	width: "100%",
}));
const HorizontalContaner = styled(Box)(() => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: "1rem",
	width: "100%",
}));

function DetailsContainer({ edit, row }: { edit?: boolean | false; row: any }) {
	const { availableRoles } = useContext(TableContext);
	const { handleEditEntry: handleEdit } = useContext(TableContext);
	const CustomTextBox = ({
		label,
		index,
		value,
		slotProps,
		type,
		disabled,
	}: {
		label: string;
		index: string;
		value: string;
		slotProps?: any;
		type?: any;
		disabled?: boolean;
	}) => {
		return (
			<DetailsTextfield
				type={type}
				slotProps={slotProps}
				disabled={!edit || disabled || false}
				label={label}
				iniitialValue={value}
				required={edit || false}
				dataIndex={{ id: row.id, key: index }}
			/>
		);
	};
	return (
		<Container>
			<HorizontalContaner>
				<IconButton
					onClick={
						edit && row.created_at
							? () => handleEdit(row.id, "is_verified", !row.is_verified)
							: undefined
					}
					sx={(theme) => ({
						padding: 0,
						animation: edit && row.created_at ? "blink 3s infinite" : "none",
						"@keyframes blink": {
							"0%": {
								transform: "scale(1)",
								boxShadow: `0 0 0 0  ${alpha(
									row.is_verified
										? theme.palette.success.main
										: theme.palette.text.secondary,
									0.7
								)}`,
							},
							"25%": {
								transform: "scale(1.05)",
								boxShadow: `0 0 0 10px ${alpha(
									row.is_verified
										? theme.palette.success.main
										: theme.palette.text.secondary,
									0
								)}`,
							},
							"50%": {
								transform: "scale(1)",
								boxShadow: `0 0 0 0 ${alpha(
									row.is_verified
										? theme.palette.success.main
										: theme.palette.text.secondary,
									0
								)}`,
							},
							"100%": {
								transform: "scale(1)",
								boxShadow: `0 0 0 0 ${alpha(
									row.is_verified
										? theme.palette.success.main
										: theme.palette.text.secondary,
									0
								)}`,
							},
						},
					})}>
					<Tooltip
						placement="right"
						title={
							row.created_at
								? row.is_verified
									? "Verified"
									: "Not Verified"
								: "Accounts are automatically verified when added using the manager"
						}>
						<VerifiedIcon
							sx={(theme) => ({
								fill: row.is_verified
									? theme.palette.success.main
									: theme.palette.text.secondary,
							})}
						/>
					</Tooltip>
				</IconButton>
				{edit && (
					<DetailsTextfield
						slotProps={{
							htmlInput: {
								maxLength: 10,
								minLength: 7,
							},
						}}
						disabled={row.id === "4DM1N"}
						label="School ID"
						iniitialValue={row.school_id}
						required={edit || false}
						dataIndex={{ id: row.id, key: "school_id" }}
					/>
				)}
				<DetailsTextfield
					disabled={!edit}
					label="First Name"
					iniitialValue={row.first_name}
					required={edit || false}
					dataIndex={{ id: row.id, key: "first_name" }}
				/>
				<DetailsTextfield
					disabled={!edit}
					label="Last Name"
					iniitialValue={row.last_name}
					required={edit || false}
					dataIndex={{ id: row.id, key: "last_name" }}
				/>
			</HorizontalContaner>
			<HorizontalContaner>
				<div
					className=""
					style={{ minWidth: "1.5rem", maxWidth: "1.5rem" }}></div>
				<CustomTextBox label="Email" index="email" value={row.email} />
				{edit && (
					<DetailsTextfield
						disabled={!edit}
						label="Password"
						iniitialValue={row.password}
						type="password"
						required={edit || false}
						dataIndex={{ id: row.id, key: "password" }}
					/>
				)}
				{edit ? (
					<LabeledSelect
						defaultValue={row.role_id}
						disabled={row.id === "4DM1N"}
						label="Role"
						onChange={(e: any) =>
							handleEdit(row.id, "role_id", e.target.value)
						}>
						{(availableRoles || []).map((role: any) => {
							return (
								<MenuItem key={role.id} value={role.id}>
									{role.role_name}
								</MenuItem>
							);
						})}
					</LabeledSelect>
				) : (
					<DetailsTextfield
						slotProps={{
							htmlInput: {
								maxLength: 10,
								minLength: 7,
							},
						}}
						disabled={row.id === "4DM1N"}
						label="School ID"
						iniitialValue={row.school_id}
						required={edit || false}
						dataIndex={{ id: row.id, key: "school_id" }}
					/>
				)}
			</HorizontalContaner>
		</Container>
	);
}

interface LabeledSelectProps {
	children?: React.ReactNode | null;
	label?: string | "";
	[props: string]: any;
}

export function LabeledSelect({
	children,
	label,
	...props
}: LabeledSelectProps) {
	return (
		<FormControl sx={{ width: "100%", "& .MuiInputBase-root": { fontSize: "0.8rem !important" }, }}>
			<InputLabel
				sx={{ fontWeight: "bold" }}
				size="small"
				id={`${label}-select-label`}>
				{label}
			</InputLabel>
			<Select
				labelId={`${label}-select-label`}
				label={label}
				id={`${label}-select`}
				size="small"
				{...props}
				fullWidth>
				{children}
			</Select>
		</FormControl>
	);
}
