//Modal.tsx
import React, { useRef } from "react";
import cn from "classnames";
import { useOnClickOutside } from "usehooks-ts";


type Props = {
    children: React.ReactNode;
    open: boolean;
    disableClickOutside?: boolean;
    onClose(): void;




};

const Modal = ({ children, open, disableClickOutside, onClose }: Props) => {
    const ref = useRef(null);
    useOnClickOutside(ref, () => {
        if (!disableClickOutside) {
            onClose();
        }
    });

    const modalClass = cn({
        "modal modal-bottom sm:modal-top": true,
        "modal-open": open,
    });
    return (
        <div className={modalClass}>

            <div className=" min-w-[50%] modal-box" ref={ref}>
                {children}
            </div>

        </div>
    );
};

export default Modal;