import { Box, Button, Modal } from "@mui/material";
import React from "react";
import { CustomModalProps } from ".";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	maxWidth: 400,
	minWidth: 200,
	bgcolor: "background.paper",
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

export const DeleteWidgetModal = ({ open, onClose, onSubmit }: CustomModalProps) => {
	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={{ ...style }}>
				<b>Are you sure you want to delete this element?</b>
				<Box marginBlockStart={5} display="flex" justifyContent="space-between">
					<Button variant="contained" color="error">
						Delete
					</Button>
					<Button variant="outlined" onClick={onClose}>
						Cancel
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};
