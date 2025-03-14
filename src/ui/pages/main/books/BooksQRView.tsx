import { Divider } from "@mui/material";
import { useEffect, useContext, useRef, useState, useLayoutEffect } from "react";
import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import TablePaginationBar from "../../components/Table/TablePaginationBar";
import columns from "../../components/Table/columns/catalog/view";
import { TableContext } from "../../context/TableContext";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import QuickResponseCard from "../../components/Table/Books/QuickResponseCard";

const fetchData = async (payload: RequestByID): Promise<any> => {
	return await window.requestCopy.getByID(payload);
};

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

	// useEffect(() => {
	// 	console.log(containerRef.current);
	// }, [containerRef.current]);
	
	const { data: preData, isLoading } = useQuery({
		queryKey: ["copyQRView", state],
		queryFn: () => fetchData(state),
		retry: 0,
		staleTime: Infinity,
	});
	
	useLayoutEffect(() => {
		if (!preData) return
		setColumns(columns);
		if (preData.success) {
			setRows(preData.data);
		}
	}, [preData]);

	const handleExport = async (cref: any) => {
		if (exporting) return;
		setExporting(true);
		const zip = new JSZip();
		const promises = Array.from(cref.current.entries()).map(
			async (el: any, index: number) => {
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
						resizedCanvas.width = canvas.width / 2; 
						resizedCanvas.height = canvas.height / 2; 
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
			{rows.map((row: any) => (
				<QuickResponseCard
					key={row.id}
					row={row}
					containerRef={containerRef}
					handleRemoveEntry={handleRemove}
				/>
			))}
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

export default BooksQRView;
function setRows(data: any) {
	throw new Error("Function not implemented.");
}

