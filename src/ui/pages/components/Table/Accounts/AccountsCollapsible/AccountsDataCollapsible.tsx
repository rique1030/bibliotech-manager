import Box from "@mui/material/Box";
import CollapsibleCotainer from "../../../StyledComponent/CollapsibleContainer";
import DetailsTextfield from "../../DetailsTextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import styled from "@mui/system/styled";
import VerifiedIcon from "@mui/icons-material/Verified";
import useUploadImage from "../../../../hooks/useUploadImage";
import ImageButton from "../../../StyledComponent/ImageButton";
import BorderedImage from "../../Books/BooksCollapsible/BorderedImage";
import { useContext, useEffect, useState } from "react";
import { TableContext } from "../../../../context/TableContext";
import { convertProfile } from "../../../../../utils/ImageHelper";
import { useLocation } from "react-router-dom";

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
        }}
      >
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
        variant="outlined"
      >
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
  const [insert, setInsert] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("add")) {
      setInsert(true);
    } else {
      setInsert(false);
    }
  }, [location]);

  return (
    <Container>
      <HorizontalContaner>
        <VerifiedIcon
          sx={(theme) => ({
            fill: row.is_verified
              ? theme.palette.success.main
              : theme.palette.text.secondary,
          })}
        />
        <DetailsTextfield
          label="First Name"
          disabled={!edit}
          iniitialValue={row.first_name}
          required={edit || false}
          dataIndex={{ id: row.id, key: "first_name" }}
        />
        <DetailsTextfield
          label="Last Name"
          disabled={!edit}
          iniitialValue={row.last_name}
          required={edit || false}
          dataIndex={{ id: row.id, key: "last_name" }}
        />
      </HorizontalContaner>
      <HorizontalContaner>
        <div
          className=""
          style={{ minWidth: "1.5rem", maxWidth: "1.5rem" }}
        ></div>
        <DetailsTextfield
          label="Email"
          disabled={!edit}
          iniitialValue={row.email}
          required={edit || false}
          dataIndex={{ id: row.id, key: "email" }}
        />
        {edit && !insert && (
          <DetailsTextfield
            label="Password"
            disabled={!edit}
            iniitialValue={row.password}
            required={edit || false}
            dataIndex={{ id: row.id, key: "password" }}
          />
        )}
        {edit && (
          <LabeledSelect
            defaultValue={row.role_id}
            disabled={row.id === "4DM1N"}
            label="Role"
            onChange={(e: any) => handleEdit(row.id, "role_id", e.target.value)}
          >
            {(availableRoles || []).map((role: any) => {
              return (
                <MenuItem key={role.id} value={role.id}>
                  {role.role_name}
                </MenuItem>
              );
            })}
          </LabeledSelect>
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
    <FormControl
      sx={{
        width: "100%",
        "& .MuiInputBase-root": { fontSize: "0.8rem !important" },
      }}
    >
      <InputLabel
        sx={{ fontWeight: "bold" }}
        size="small"
        id={`${label}-select-label`}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${label}-select-label`}
        label={label}
        id={`${label}-select`}
        size="small"
        {...props}
        fullWidth
      >
        {children}
      </Select>
    </FormControl>
  );
}
