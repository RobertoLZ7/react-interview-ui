import React from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { CustomModalProps, style } from ".";
import { Widget, updateWidget } from "../../lib/apiConnect";
import {
	isDescriptionValid,
	isPriceValid,
} from "../../util/input-validations";
import { useModal } from "../../hooks/useModal";
import { useDispatch } from "react-redux";
import { displaySnackbar, updateWidget as updateOnContext } from "../../redux/reducers/widgets-slice";
export const UpdateWidgetModal = ({
	open,
	onClose,
	widget,
}: CustomModalProps) => {
	const [editedWidget, setEditedWidget] = React.useState<Widget>({
		name: widget?.name ?? "",
		description: widget?.description ?? "",
		price: widget?.price ?? 0,
	});
	const { handleErrorFromServer } = useModal();
	const dispatch = useDispatch();

	const handleClose = () => {
		onClose();
		setEditedWidget({
			name: widget?.name ?? "",
			description: widget?.description ?? "",
			price: widget?.price ?? 0,
		});
	};
	const [descriptionError, setDescriptionError] =
		React.useState<boolean>(false);
	const [priceError, setPriceError] = React.useState<boolean>(false);

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEditedWidget({
			...editedWidget,
			[event.target.name]: event.target.value,
		});
	};

	const handleUpdateWidget = () => {
		const tempDescriptionError = !isDescriptionValid(editedWidget.description);
		const tempPriceError = !isPriceValid(editedWidget.price);

		setDescriptionError(tempDescriptionError);
		setPriceError(tempPriceError);

		if (tempDescriptionError || tempPriceError) {
			return;
		}

		updateWidget(editedWidget).then(data => {
			dispatch(updateOnContext(data));
			dispatch(displaySnackbar({open: true, message: "Widget updated successfully"}));
			onClose();
		})
		.catch(err => handleErrorFromServer(err.response.data));
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={{ ...style }}>
				<h3>Updating {widget?.name}</h3>
				<TextField
					error={descriptionError}
					fullWidth
					id="description-field"
					name="description"
					variant="outlined"
					label="description"
					margin="normal"
					value={editedWidget?.description}
					onChange={handleOnChange}
					helperText="description must be between 5 and 1000 characters"
				/>
				<TextField
					error={priceError}
					fullWidth
					id="price-field"
					name="price"
					variant="outlined"
					type="number"
					label="price"
					margin="normal"
					value={editedWidget?.price}
					onChange={handleOnChange}
					helperText="price must be between 1 and 20,000"
				/>

				<Box marginBlockStart={5} display="flex" justifyContent="space-between">
					<Button
						variant="contained"
						color="primary"
						onClick={handleUpdateWidget}
					>
						Save
					</Button>
					<Button variant="outlined" onClick={handleClose}>
						Cancel
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};
