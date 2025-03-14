import { Box, Grid2, styled } from "@mui/material"
import ContentIndicator from "./ViewTableContentIndicator"
import { useEffect, useState } from "react"

interface ImageLayoutProps {
   children: React.ReactNode
   rows: any[]
   isLoading: boolean
}

const FullScreenWrapper = styled(Box)(() => ({
   height: "100%",
   width: "100%",
   display: "flex",
   overflow: "auto",
   position: "relative",
}))

const CenterWrapper = styled(Box)(() => ({
   position: "absolute",
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   display: "flex",
   justifyContent: "center",
}))

export default function ImageLayout({ children, rows, isLoading}: ImageLayoutProps) {
   const [isEmpty, setIsEmpty] = useState(false)
   useEffect(() => {
      setIsEmpty(rows.length === 0)
   },[rows])
   return (
      <FullScreenWrapper>
         <CenterWrapper>
            {isEmpty ? (<ContentIndicator loading={isLoading} />) : (
               <Grid2
                  container
                  columns={5} columnSpacing={5} rowSpacing={5} sx={{
                     margin: "10px",
                     height: "fit-content",
                     width: "fit-content",
                     justifyContent: "center",
                  }}
               >
                  {children}
               </Grid2>
            )}
         </CenterWrapper>
      </FullScreenWrapper>
   )
}