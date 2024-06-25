import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import WidgetDisplay from "../WidgetDisplay";
import { fetchAllWidgets, Widget } from "../../lib/apiConnect";
import { Box, Button, Snackbar } from "@mui/material";
import { useModal } from "../../hooks/useModal";
import { CreateWidgetModal } from "../modals/index";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { displaySnackbar, populateWidgets } from "../../redux/reducers/widgets-slice";

const WidgetList = (): JSX.Element => {
	const { open, handleClose, handleOpen, handleErrorFromServer } = useModal();
	const snackbarData = useAppSelector((state) => state.widgets.snackbar);
	const widgetList = useAppSelector((state) => state.widgets.widgetList)
	const dispatch = useAppDispatch()
	useEffect(() => {
		fetchAllWidgets()
			.then((data) => dispatch(populateWidgets(data)))
			.catch(error => handleErrorFromServer(error.response.data));
	}, []);

	return (
		<>
			<Stack
				spacing={4}
				sx={{ margin: "auto", maxWidth: 900, paddingTop: "4em", width: "100%" }}
			>
				<Typography sx={{ textAlign: "center" }} variant="h3">
					List of widgets:
				</Typography>
				<Box display="flex" alignItems="center" justifyContent="center">
					<Button variant="contained" onClick={handleOpen}>
						Create
					</Button>
				</Box>
				<Grid
					container
					justifyContent="center"
					spacing={4}
					sx={{ paddingRight: 4, width: "100%" }}
				>
					{widgetList.map((current, index) => (
						<WidgetDisplay key={index} widget={current} />
					))}
				</Grid>
			</Stack>
			<CreateWidgetModal open={open} onClose={handleClose} />
			<Snackbar open={snackbarData.open} autoHideDuration={6000} message={snackbarData.message} onClose={() => dispatch(displaySnackbar({open: false, message: ""}))}/>
		</>
	);
};

export default WidgetList;
