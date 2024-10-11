import React from 'react'
import {
    Button,
    Dialog,
} from "@material-tailwind/react";


const Modal = ({ children, buttonData, buttonColor }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    return (
        <>
            <Button className={buttonColor} onClick={handleOpen}>{buttonData}</Button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                
                {children}
            </Dialog>
        </>
    )
}

export default Modal