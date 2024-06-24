import React from 'react';

export const useModal = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)

    return {
        open,
        handleClose,
        handleOpen
    }
}