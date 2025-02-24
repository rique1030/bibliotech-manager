import Box from "@mui/material/Box";
import StyledCell from "./TableStyledCell";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Typography } from "@mui/material";

interface VerificationCellProps {
    columns: any[];
    column: any;
    isVerified: boolean
}

function VerificationCell ({columns, column, isVerified}: VerificationCellProps ) {
    return (
        <StyledCell
            index={columns.indexOf(column)}
            length={columns.length}
            key={column.id}
            column={column}
            borderColor="divider"
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                }}
            >
                <VerifiedIcon
                    sx={(theme) => ({
                        fill:
                            isVerified === true
                                ? theme.palette.success.main
                                : theme.palette.text.secondary,
                    })}
                />
                <Typography variant="overline" sx={{ color: "text.secondary" }}>
                    {isVerified === true ? "Verified" : "Not Verified"}
                </Typography>
            </Box>
        </StyledCell>
    )
}

export default VerificationCell