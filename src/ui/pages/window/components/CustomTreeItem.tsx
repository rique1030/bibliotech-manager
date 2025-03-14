import { Box, styled, Tooltip } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2";
import React, { cloneElement } from "react";
import {
	TreeItem2Content,
	TreeItem2IconContainer,
	TreeItem2GroupTransition,
	TreeItem2Label,
	TreeItem2Root,
} from "@mui/x-tree-view/TreeItem2";
import { TreeItem2Icon } from "@mui/x-tree-view/TreeItem2Icon";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
	padding: theme.spacing(0.8, 1),
}));

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
	props: any,
	ref: React.Ref<HTMLLIElement> | undefined
) {
	const navigate = useNavigate();
	const location = useLocation();
	const {
		id,
		itemId,
		label,
		disabled,
		children,
		onClick = undefined,
		main = false,
		icon = null,
		src = null,
		...other
	} = props;

	const {
		getRootProps,
		getContentProps,
		getIconContainerProps,
		getLabelProps,
		getGroupTransitionProps,
		status,
	} = useTreeItem2({
		id,
		itemId,
		children,
		label,
		disabled,
		rootRef: ref,
	});

	const navigateToPage = async () => {
		if (disabled) return;
		if (!src) return;
		setTimeout(() => navigate(src), 10);
	};
	return (
		<TreeItem2Provider itemId={itemId}>
			<Tooltip
				disableInteractive
				placement="right"
				title={
					children || main
						? ""
						: disabled
						? "You don't have enough permission to access this"
						: ""
				}
			>
				<span>
					<TreeItem2Root {...getRootProps(other)} onClick={navigateToPage}>
						<CustomTreeItemContent
							sx={{ paddingLeft: "1rem" }}
							{...getContentProps()}
						>
							<Box
								onClick={onClick}
								sx={{
									flexGrow: 1,
									display: "flex",
									gap: 1,
									minHeight: "2rem",
									alignItems: "center",
								}}
							>
								{icon &&
									cloneElement(icon, {
										sx: {
											fontSize: "1.2rem",
											color: children || main
												? "primary.main"
												: location.pathname === src
												? "primary.main"
												: "text.secondary",
										},
									})}
								<TreeItem2Label
									sx={{
										fontSize: children || main ? "1rem" : "0.8rem",
										fontWeight: "bold",
										color: children || main
											? "primary.main"
											: location.pathname === src
											? "primary.main"
											: "text.secondary",
										whiteSpace: "nowrap",
									}}
									{...getLabelProps()}
								/>
							</Box>
							<TreeItem2IconContainer
								sx={{
									color: "primary.main",
									width: "1.5rem",
									"& svg": { fontSize: "1.5rem" },
								}}
								{...getIconContainerProps()}
							>
								<TreeItem2Icon status={status} />
							</TreeItem2IconContainer>
						</CustomTreeItemContent>
						{children  && (
							<TreeItem2GroupTransition
								sx={{
									paddingLeft: "0.5rem",
									borderLeft: "1px dashed",
									borderColor: "divider",
									marginLeft: "1.5rem",
								}}
								{...getGroupTransitionProps()}
							/>
						)}
					</TreeItem2Root>
				</span>
			</Tooltip>
		</TreeItem2Provider>
	);
});

export default CustomTreeItem;
