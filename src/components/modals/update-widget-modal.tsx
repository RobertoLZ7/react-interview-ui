import React from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
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

export const UpdateWidgetModal = ({
	open,
	onClose,
	onSubmit,
	widget,
}: CustomModalProps) => {
	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={{ ...style }}>
				<h3>Updating {widget?.name}</h3>
				<TextField
                    fullWidth
					id="description-field"
					name="description"
					variant="outlined"
					label="description"
					defaultValue={widget?.description}
                    margin="normal"
				/>
				<TextField
                    fullWidth
					id="price-field"
					name="price"
					variant="outlined"
					type="number"
					label="price"
                    margin="normal"
				/>

				<Box marginBlockStart={5} display="flex" justifyContent="space-between">
					<Button variant="contained" color="primary" >
						Save
					</Button>
					<Button variant="outlined" onClick={onClose}>
						Cancel
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};
