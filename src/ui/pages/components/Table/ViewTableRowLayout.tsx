import { Table } from "@mui/material";
import ContentIndicator from "./ViewTableContentIndicator";
import { useEffect, useLayoutEffect, useState } from "react";

interface ContentIndicatorProps {
   loading: boolean;
   rows: any[];
   children: React.ReactNode
}

export default function RowLayout({ children,  rows, loading }: ContentIndicatorProps) {
   const [isEmpty, setIsEmpty] = useState(true);
   useEffect(() => {
      setIsEmpty(rows.length === 0);
   },[rows])
   return (
      <>
         <Table stickyHeader>{children}</Table>
         {isEmpty && <ContentIndicator rowed loading={loading}/>}
      </>
   );
};