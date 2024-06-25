import React from 'react';
import { useDispatch } from 'react-redux';
import { displaySnackbar } from '../redux/reducers/widgets-slice';

export const useModal = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const dispatch = useDispatch()
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)
    const handleErrorFromServer = (error: any) => {
        debugger
        let errorMessage = error.response?.data;
        if (!errorMessage) {
            errorMessage = "Internal Server Error";
        }

        dispatch(displaySnackbar({open: true, message: errorMessage}))
    }; 

    return {
        open,
        handleClose,
        handleOpen,
        handleErrorFromServer
    }
}