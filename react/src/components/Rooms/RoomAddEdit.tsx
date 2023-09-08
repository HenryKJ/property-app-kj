import Modal from "../Common/Modal";
import { Room } from "../../../lib/helpers/types";
import {useEffect, useState} from "react";
import {useSaveRoom} from "../../../lib/helpers/hooks";
import RoomForm from "./RoomForm";
import {number} from "prop-types";

const RoomAddEdit = ({isOpen, onClose, room}: { isOpen: boolean; onClose: () => void; room?: Room }) => {
    // State to manage the properties (for editing)
    // State to manage the currently edited property
    const [editRoom, setEditRoom] = useState<Room | undefined>(room);
    const saveRoom = useSaveRoom()

    // Handle form submission (create or edit)
    const handleFormSubmit = (formData: Partial<Room>) => {
        if (editRoom) {
            formData = {...editRoom, ...formData}
        }


        saveRoom.mutateAsync(formData).then(() => {
            onClose()
            window.location.reload()
        })
    };

    useEffect(() => {
        setEditRoom(room)
    },[room])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <RoomForm onSubmit={handleFormSubmit} initialData={editRoom} />
        </Modal>
    )
}

export { RoomAddEdit }
