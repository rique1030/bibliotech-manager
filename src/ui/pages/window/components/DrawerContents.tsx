import React, { useState, cloneElement, useEffect } from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ExpandLess, ExpandMore } from "@mui/icons-material";

const ParentIconSx = {
  sx: {
    color: "primary.main",
    justifySelf: "center",
    fontSize: "1.2rem",
    width: "100%",
  },
};

const ChildIconSx = {
  sx: {
    fontSize: "1.2rem",
    color: "text.primary",
    justifySelf: "center",
    width: "100%",
    opacity: 0.5,
  },
};

interface DrawerItemProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: (index: number) => void;
  title?: string;
  isSelect?: boolean;
}

function ParentListItem({
  children,
  icon,
  title,
}: DrawerItemProps): JSX.Element {
  const [openParent, setOpenParent] = useState(false);

  useEffect(() => {
    setOpenParent(true);
  }, [children]);

  return (
    <>
      <ListItemButton
        onClick={() => setOpenParent(!openParent)}
        sx={{
          width: "100%",
          height: "3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <ListItemIcon>
          {React.isValidElement(icon) && cloneElement(icon, ParentIconSx)}
        </ListItemIcon>
        <ListItemText
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            "& > span": { fontWeight: "bold" },
          }}
          primary={title}
        />
        {openParent ? (
          <ExpandLess sx={{ color: "text.primary" }} />
        ) : (
          <ExpandMore sx={{ color: "text.primary" }} />
        )}
      </ListItemButton>
      <Collapse
        in={openParent}
        sx={{
          width: "100%",
          height: "2rem",
        }}
      >
        {children}
      </Collapse>
    </>
  );
}

interface ChildListItemProps {
  icon: React.ReactNode;
  title: string;
  src?: string;
}

function ChildListItem({ icon, title, src }: ChildListItemProps): JSX.Element {
  const navigate = useNavigate();
  const handleClick = () => {
    if (src) navigate(src);
  };

  return (
    <ListItemButton
      onClick={handleClick}
      sx={{ width: "100%", paddingLeft: "1.5rem" }}
    >
      <ListItemIcon>
        {React.isValidElement(icon) && cloneElement(icon, ChildIconSx)}
      </ListItemIcon>
      <ListItemText
        sx={{
          color: "text.primary",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          "& > span": { lineHeight: "1rem" },
        }}
        primary={title}
      />
    </ListItemButton>
  );
}

export { ParentListItem, ChildListItem };
