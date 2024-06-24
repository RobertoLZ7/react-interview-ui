import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { Widget } from "../../lib/apiConnect";
import { Box, ButtonGroup, IconButton } from "@mui/material";
import { DeleteWidgetModal, UpdateWidgetModal } from "../modals";
import { useModal } from "../../hooks/useModal";

export interface DisplayWidgetProps {
	widget: Widget;
}

const DisplayWidget = ({ widget }: DisplayWidgetProps): JSX.Element => {
	const { description, name, price } = widget;
	const {open: editModalOpen, handleOpen: handleEditModalOpen, handleClose: handleEditModalClose} = useModal();
	const {open: deleteModalOpen, handleOpen: handleDeleteModalOpen, handleClose: handleDeleteModalClose} = useModal();

	const handleEdit = () => {

	}

	const handleDelete = () => {

	}
	
	return (
		<>
		<Grid item xs={6}>
			<Card>
				<CardContent>
					<Stack spacing={2}>
						<Typography component="div" gutterBottom variant="h4">
							<Box display="flex" justifyContent="space-between">
								{name}
								<ButtonGroup>
									<IconButton aria-label="edit" color="primary" onClick={handleEditModalOpen}>
										<EditIcon />
									</IconButton>
									<IconButton aria-label="delete" color="error" onClick={handleDeleteModalOpen}>
										<DeleteForeverIcon />
									</IconButton>
								</ButtonGroup>
							</Box>
						</Typography>
						<Typography component="div" gutterBottom variant="h5">
							${price}
						</Typography>
						<Typography color="text.secondary" variant="body2">
							{description}
						</Typography>
					</Stack>
				</CardContent>
			</Card>
		</Grid>
		<UpdateWidgetModal open={editModalOpen} onClose={handleEditModalClose} onSubmit={handleEdit} widget={widget}/>
		<DeleteWidgetModal open={deleteModalOpen} onClose={handleDeleteModalClose} onSubmit={handleDelete}/>
		</>
		
	);
};

export default DisplayWidget;
