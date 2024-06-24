import React from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { CustomModalProps } from ".";
import { Widget, createWidget } from "../../lib/apiConnect";
import { isDescriptionValid, isNameValid, isPriceValid } from "../../util/input-validations";

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

export const CreateWidgetModal = ({
	open,
	onClose
}: CustomModalProps) => {
	const [newWidget, setNewWidget] = React.useState<Widget>({
		name: "",
		description: "",
		price: 0,
	});
	const [nameError, setNameError] = React.useState<boolean>(false);
	const [descriptionError, setDescriptionError] =
		React.useState<boolean>(false);
	const [priceError, setPriceError] = React.useState<boolean>(false);

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewWidget({
			...newWidget,
			[event.target.name]: event.target.value,
		});

        console.log(newWidget.price)
	};

    const handleSave = () => {
        const tempNameError = !isNameValid(newWidget.name);
        const tempDescriptionError = !isDescriptionValid(newWidget.description);
        const tempPriceError = !isPriceValid(newWidget.price);
debugger
        setNameError(tempNameError);
        setDescriptionError(tempDescriptionError);
        setPriceError(tempPriceError);

        if (tempNameError || tempDescriptionError || tempPriceError) {
            return;
        }

        createWidget(newWidget).then((data) => console.log(data) );
    }

	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={{ ...style }}>
				<h3>Create new widget</h3>
				<TextField
					error={nameError}
					fullWidth
					id="name-field"
					name="name"
					variant="outlined"
					label="name"
					margin="normal"
					helperText="name must be between 3 and 100 characters"
					value={newWidget.name}
					onChange={handleOnChange}
				/>
				<TextField
					error={descriptionError}
					fullWidth
					id="description-field"
					name="description"
					variant="outlined"
					label="description"
					margin="normal"
					helperText="description must be between 5 and 1000 characters"
					value={newWidget.description}
					onChange={handleOnChange}
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
					helperText="price must be between 1 and 20,000"
                    value={newWidget.price}
                    onChange={handleOnChange}
				/>

				<Box marginBlockStart={5} display="flex" justifyContent="space-between">
					<Button variant="contained" color="primary" onClick={handleSave}>
						Create
					</Button>
					<Button variant="outlined" onClick={onClose}>
						Cancel
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};
