import {
	Box,
	Divider,
	Grid2,
	Paper,
	ThemeProvider,
	Typography,
} from "@mui/material";
import useSearch from "../../hooks/useSearch";
import { useEffect, useContext, useRef, useState, memo } from "react";
import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import TablePaginationBar from "../../components/Table/TablePaginationBar";
// import SearchPanel from "../../components/SearchPanel";
// import BooksData from "../../components/Table/Books/BooksData";
// import TableHeader from "../../components/Table/TableHeader";
import columns from "../../components/Table/columns/DefaultBookColumnsInterface";
import { TableContext } from "../../context/TableContext";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { convertQRCode } from "../../../utils/ImageHelper";
import lightTheme from "../../themes/LightTheme";
import RemoveButton from "../../components/RemoveButton";
import html2canvas from "html2canvas";
import JSZip from "jszip";
// import { PermissionContext } from "../../context/PermissionContext";

const fetchData = async (payload: RequestByID): Promise<any> => {
	return await window.requestBook.getByID(payload);
};

const searchFilter = [
	{ filter: "acc no", value: "access_number" },
	{ filter: "call no", value: "call_number" },
	{ filter: "title", value: "title" },
	{ filter: "author", value: "author" },
	{ filter: "status", value: "status" },
];

const URL = {};

function BooksQRView() {
	const location = useLocation();
	const [exporting, setExporting] = useState(false);
	const { state } = location;

	const containerRef = useRef<Map<number, HTMLDivElement>>(new Map());

	const {
		rowData: { setRows, rows },
		columnData: { setColumns },
		handleRemoveEntry,
	} = useContext(TableContext);

	const handleRemove = async (id: number) => {
		handleRemoveEntry(id);
		containerRef.current.delete(id);
	};

	useEffect(() => {
		console.log(containerRef.current);
	}, [containerRef.current]);

	useEffect(() => {
		setColumns(columns);
	}, []);

	const { data: preData, isLoading } = useQuery({
		queryKey: ["booksQRView", state],
		queryFn: () => fetchData(state),
		retry: 0,
		staleTime: Infinity,
	});

	useEffect(() => {
		if (!preData?.success) return;
		setRows(preData.data);
	}, [preData]);

	const handleExport = async (cref: any) => {
		if (exporting) return;
		setExporting(true);
		const zip = new JSZip();
		const promises = Array.from(cref.current.entries()).map(
			async (el: any, index: number) => {
				console.log(el[1]);
				if (
					el[1] &&
					el[1] instanceof HTMLDivElement &&
					document.body.contains(el[1])
				) {
					try {
						const canvas = await html2canvas(el[1], {
							scale: window.devicePixelRatio * 2,
							useCORS: true,
							allowTaint: true,
							backgroundColor: null,
							logging: false,
						});
						const resizedCanvas = document.createElement("canvas");
						const ctx = resizedCanvas.getContext("2d");
						if (!ctx) return;
						resizedCanvas.width = canvas.width / 2; // Scale down
						resizedCanvas.height = canvas.height / 2; // Scale down
						ctx.drawImage(
							canvas,
							0,
							0,
							resizedCanvas.width,
							resizedCanvas.height
						);
						const img = await resizedCanvas.toDataURL("image/png");
						await zip.file(`${index}.png`, img.split(",")[1], { base64: true });
					} catch (error) {
						console.log(error);
					}
				}
			}
		);
		await Promise.all(promises);

		zip.generateAsync({ type: "blob" }).then((content) => {
			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(content);
			link.download = "books.zip";
			link.click();
		});

		setExporting(false);
	};

	return (
		<MainContainer>
			<ViewTable isLoading={isLoading} image>
				<QRComponent
					rows={rows}
					handleRemoveEntry={handleRemove}
					containerRef={containerRef}
				/>
			</ViewTable>
			<Divider variant="middle" />
			<TablePaginationBar
				canExport
				footer
				doExport={() => handleExport(containerRef)}
				isExporting={exporting}
			/>
		</MainContainer>
	);
}

function QRComponent({ rows, handleRemoveEntry, containerRef }: any) {
	return (
		<ThemeProvider theme={lightTheme}>
			{rows.map((row: any) => (
				<MemoizedQRPaper
					key={row.id}
					row={row}
					containerRef={containerRef}
					handleRemoveEntry={handleRemoveEntry}
				/>
			))}
		</ThemeProvider>
	);
}
export default BooksQRView;

function QRPaper({ row, containerRef, handleRemoveEntry }: any) {
	const assignRef = (id: number, ref: HTMLDivElement) => {
		if (ref) {
			containerRef.current.set(id, ref);
		} else {
			containerRef.current.delete(id);
		}
	};
	return (
		<Grid2
			key={row.id}
			sx={{
				width: "18%",
			}}
		>
			<Paper
				ref={(el: HTMLDivElement) => assignRef(row.id, el)}
				variant="elevation"
				elevation={3}
				sx={{
					"@keyframes fadeIn": {
						"0%": { opacity: 0 },
						"100%": { opacity: 1 },
					},
					animation: "fadeIn 0.3s ease-out",
					position: "relative",
					backgroundColor: "white",
					aspectRatio: "3 / 4",
					width: "100%",
					borderRadius: "5px",
					overflow: "hidden",
					display: "flex",
					flexDirection: "column",
					alignContent: "center",
					"&:hover": {
						" .MuiButtonBase-root": {
							opacity: 1,
						},
					},
				}}
			>
				<RemoveButton
					onClick={() => handleRemoveEntry(row.id)}
					sx={{
						position: "absolute",
						top: "0.5rem",
						right: "0.5rem",
						opacity: 0,
						transition: "opacity 0.3s ease-in-out",
					}}
					iconSx={{ fontSize: "1.2rem" }}
				/>
				<Box
					sx={{
						width: "70%",
						alignSelf: "center",
						aspectRatio: "1 / 1",
						backgroundImage: `url(${convertQRCode(row.access_number)})`,
						backgroundSize: "contain", // Ensures image fits without stretching
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
					}}
				/>
				<Typography
					sx={{
						fontSize: "clamp(0.3rem, 1vw, 1rem)",
						textAlign: "center",
						fontWeight: "bold",
						whiteSpace: "nowrap",
					}}
				>
					{row.access_number}
				</Typography>
				<Divider />
				<Box
					sx={{
						padding: "clamp(0px, 0.5vh, 0.5rem)",
						flexGrow: 1,
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Typography
						sx={{
							fontSize: "clamp(0.3rem, 1.8vh, 1rem)",
							fontWeight: "bold",
							textAlign: "center",
						}}
					>
						&ldquo;
						{row.title}
						&rdquo;
					</Typography>
				</Box>
			</Paper>
		</Grid2>
	);
}

const MemoizedQRPaper = memo(
	({ row, containerRef, handleRemoveEntry }: any) => {
		return (
			<QRPaper
				row={row}
				containerRef={containerRef}
				handleRemoveEntry={handleRemoveEntry}
			/>
		);
	}
);
