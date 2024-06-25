import { Box, Button, Modal } from "@mui/material";
import React from "react";
import { CustomModalProps, style } from ".";
import { deleteWidget } from "../../lib/apiConnect";
import { useDispatch } from "react-redux";
import { displaySnackbar, removeWidget } from "../../redux/reducers/widgets-slice";
import { useModal } from "../../hooks/useModal";

export const DeleteWidgetModal = ({ open, onClose, widget }: CustomModalProps) => {
	const dispatch = useDispatch();
	const { handleErrorFromServer } = useModal();
	
	const handleDeleteWidget = () => {
		if (widget) {
			deleteWidget(widget.name).then((data) => {
				dispatch(removeWidget(data.name));
				dispatch(displaySnackbar({open: true, message: "Widget deleted successfully"}))
				onClose();
			})
			.catch(err => handleErrorFromServer(err.response.data));
		}
	}

	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={{ ...style }}>
				<b>Are you sure you want to delete this element?</b>
				<Box marginBlockStart={5} display="flex" justifyContent="space-between">
					<Button variant="contained" color="error" onClick={handleDeleteWidget}>
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
