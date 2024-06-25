import React from "react";
import DisplayWidget from "../WidgetDisplay";
import { CustomModalProps, style } from ".";
import { Box, Modal } from "@mui/material";

export const SelectedWidgetModal = ({
	widget,
	open,
	onClose,
}: CustomModalProps) => widget ? (
	<Modal open={open} onClose={onClose} >
        <Box sx={{...style, bgcolor: "none", boxShadow: 0, outline: "none"}}>
		<DisplayWidget widget={widget} />

        </Box>
	</Modal>
) : null;
