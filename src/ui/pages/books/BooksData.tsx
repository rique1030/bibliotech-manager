import { Box, Typography, Skeleton, Tooltip, Theme } from "@mui/material";
import useIsImageValid from "../hooks/useIsImageValid";
import {
  TableData,
  TableDataCollapsible,
  GetStatus,
} from "../components/Table/Table";
import React, { Fragment } from "react";
const BooksDataCollapsible = ({ row }: { row: booksRowsInterface }) => {
  const isCoverImageLoading = useIsImageValid(row.cover_image || "");
  const isQRCodeLoading = useIsImageValid(row.qrcode || "");

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        width: "100%",
        m: 0,
        p: 2,
        boxSizing: "border-box",
        border: "solid #e0e0e0",
        borderWidth: "2px 0",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <BorderedImage
          src={row.cover_image || ""}
          alt="Cover"
          maxWidth={100}
          maxHeight={150}
          isLoading={isCoverImageLoading}
        />
        {row.status ? (
          <GetStatus
            bookStatus={row.status as bookStatusInterface["bookStatus"]}
          />
        ) : (
          <Skeleton variant="rectangular" sx={{ width: 100, height: 20 }} />
        )}
      </Box>
      {/* Right Panel */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        {/* Top */}
        <Box
          sx={(theme: Theme) => ({
            display: "flex",
            flexDirection: "row",
            gap: 4,
            width: "100%",
            "& .MuiTypography-root": {
              display: "flex",
              alignItems: "center",
              height: 42,
              fontSize: "0.8rem",
              width: "100%",
              align: "center",
              "& .MuiSpan-Name": { flex: 1, textAlign: "right", color: "gray" },
              "& .MuiSpan-Bold": { fontWeight: "bold", marginRight: 2 },
              backgroundColor: "rgba(91, 64, 228, 0.15)",
              padding: "0 10px",
              borderRadius: theme.shape.borderRadius,
            },

            "& .MuiBox-root": {
              display: "flex",
              flexDirection: "column",
              gap: 1,
              flex: 1,
            },
          })}
        >
          <Box>
            <BooksDataText text="Access No">{row.access_number}</BooksDataText>
            <BooksDataText text="Call No">{row.call_number}</BooksDataText>
          </Box>
          <Box>
            <BooksDataText text="Title">{row.title}</BooksDataText>
            <BooksDataText text="Author">{row.author}</BooksDataText>
          </Box>
          <Box>
            <BooksDataText text="Publisher">{row.publisher}</BooksDataText>
            <BooksDataText text="Date Added">
              {row.date_added ? row.date_added.toDateString() : null}
            </BooksDataText>
          </Box>
          <BorderedImage
            src={row.qrcode || ""}
            alt="QR Code"
            maxWidth={85}
            maxHeight={85}
            isLoading={isQRCodeLoading}
          />
        </Box>
        {/* Bottom */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          {/* Description */}
          <Box
            sx={{
              width: "100%",
              height: 85,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <Tooltip
              title="Description"
              placement="right"
              arrow
              disableInteractive
            >
              <Typography
                variant="body2"
                sx={(theme: Theme) => ({
                  flex: 1,
                  height: "100%",
                  fontSize: "0.8rem",
                  boxSizing: "border-box",
                  color: "gray",
                  backgroundColor: "rgba(91, 64, 228, 0.15)",
                  padding: "5px 10px",
                  borderRadius: theme.shape.borderRadius,
                })}
              >
                {row.description ? (
                  <span className="MuiSpan-Name">{row.description}</span>
                ) : (
                  <Skeleton />
                )}
              </Typography>
            </Tooltip>
            <Skeleton variant="rectangular" sx={{ width: "50%", height: 80 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const BooksDataText = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <Tooltip title={text} placement="top" arrow disableInteractive>
      <Typography>
        <span style={{ userSelect: "none" }} className="MuiSpan-Bold">
          {text}:&nbsp;
        </span>
        {children ? (
          <span className="MuiSpan-Name">{children}</span>
        ) : (
          <Skeleton />
        )}
      </Typography>
    </Tooltip>
  );
};

const BorderedImage = ({
  src,
  alt,
  maxWidth,
  maxHeight,
  isLoading,
}: {
  src: string;
  alt: string;
  maxWidth: number;
  maxHeight: number;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{ width: maxWidth, height: maxHeight }}
      />
    );
  }
  return (
    <Box
      component={"img"}
      src={src}
      alt={alt}
      sx={(theme: Theme) => ({
        maxHeight: maxHeight,
        maxWidth: maxWidth,
        width: maxWidth,
        height: maxHeight,
        objectFit: "cover",
        border: "solid",
        borderWidth: 3,
        borderColor: `primary.main`, //`alpha(${theme.palette.primary.main}, 1)`,
        borderRadius: theme.shape.borderRadius,
      })}
    />
  );
};

const BooksData = ({
  rows,
  columns,
  onRowClick,
  openedRowIndex,
  isCheck,
  onCheck,
}: booksDataInterface) => {
  return (
    <>
      {rows.map((row, index) => (
        <Fragment key={row.access_number}>
          <TableData
            index={index}
            row={row}
            columns={columns}
            openedRowIndex={openedRowIndex}
            onClick={onRowClick}
            isCheck={isCheck}
            onCheck={onCheck}
          />
          <TableDataCollapsible openedRowIndex={openedRowIndex} index={index}>
            <BooksDataCollapsible row={row} />
          </TableDataCollapsible>
        </Fragment>
      ))}
    </>
  );
};

export default BooksData;
