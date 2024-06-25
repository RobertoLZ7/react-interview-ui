import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import WidgetDisplay from "../WidgetDisplay";
import { Widget, fetchAllWidgets, fetchWidgetByName } from "../../lib/apiConnect";
import { Autocomplete, Box, Button, Snackbar, TextField } from "@mui/material";
import { useModal } from "../../hooks/useModal";
import { CreateWidgetModal } from "../modals/index";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
	displaySnackbar,
	populateWidgets,
} from "../../redux/reducers/widgets-slice";
import { SelectedWidgetModal } from "../modals/selected-widget-modal";

const WidgetList = (): JSX.Element => {
	const [selectedWidget, setSelectedWidget] = React.useState<Widget>();
	const { open, handleClose, handleOpen, handleErrorFromServer } = useModal();
	const { open: openSelectedModal, handleClose: handleCloseSelectedModal, handleOpen: handleOpenSelectedModal } = useModal();
	const snackbarData = useAppSelector(state => state.widgets.snackbar);
	const widgetList = useAppSelector(state => state.widgets.widgetList);
	const dispatch = useAppDispatch();
	const handleSelectWidget = (name: string | null) => {
		if (name) {
			fetchWidgetByName(name).then((data) => {
				setSelectedWidget(data)
				handleOpenSelectedModal();
			}).catch(err => handleErrorFromServer(err));
		}
	}
	useEffect(() => {
		fetchAllWidgets()
			.then(data => dispatch(populateWidgets(data)))
			.catch(err => handleErrorFromServer(err));
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
				<Autocomplete
					disablePortal
					id="combo-box-demo"
					options={widgetList.map(element => element.name)}
					renderInput={params => <TextField {...params} label="Search by name" />}
					onChange={(event: any, newValue: string | null) => handleSelectWidget(newValue)}
				/>
				<Grid
					container
					justifyContent="center"
					spacing={4}
					sx={{ paddingRight: 4, width: "100%" }}
				>
					{widgetList.map((current, index) => (
						<WidgetDisplay key={`${current.name}_${index}`} widget={current} withButtons/>
					))}
				</Grid>
			</Stack>
			<CreateWidgetModal open={open} onClose={handleClose} />
			<SelectedWidgetModal widget={selectedWidget} open={openSelectedModal} onClose={handleCloseSelectedModal}/>
			<Snackbar
				open={snackbarData.open}
				autoHideDuration={6000}
				message={snackbarData.message}
				onClose={() => dispatch(displaySnackbar({ open: false, message: "" }))}
			/>
		</>
	);
};

export default WidgetList;
