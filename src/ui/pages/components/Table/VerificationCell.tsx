import Box from "@mui/material/Box";
import StyledCell from "./TableStyledCell";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Typography } from "@mui/material";

interface VerificationCellProps {
    column: any;
    isVerified: boolean
    width: number
}

function VerificationCell ({column, isVerified, width}: VerificationCellProps ) {
    return (
        <StyledCell column={column} sx={{width: width,}}>
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
                <Typography variant="overline" sx={{ color: "text.secondary", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {isVerified === true ? "Verified" : "Not Verified"}
                </Typography>
            </Box>
        </StyledCell>
    )
}

export default VerificationCell