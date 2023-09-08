import Modal from "../Common/Modal";
import { Property } from "../../../lib/helpers/types";
import PropertyForm from "./PropertyForm";
import {useEffect, useState} from "react";
import {useSaveProperty} from "../../../lib/helpers/hooks";

const PropertyAddEdit = ({isOpen, onClose, property}: { isOpen: boolean; onClose: () => void; property?: Property }) => {
    // State to manage the properties (for editing)
    // State to manage the currently edited property
    const [editProperty, setEditProperty] = useState<Property | undefined>(property);
    const saveProperty = useSaveProperty()

    // Handle form submission (create or edit)
    const handleFormSubmit = (formData: Partial<Property>) => {
        if (editProperty) {
            formData = {...editProperty, ...formData}
        }

        saveProperty.mutateAsync(formData).then(() => {
            onClose()
        })
    };

    useEffect(() => {
        setEditProperty(property)
    },[property])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <PropertyForm onSubmit={handleFormSubmit} initialData={editProperty} />
        </Modal>
    )
}

export { PropertyAddEdit }
