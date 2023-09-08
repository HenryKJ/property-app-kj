import './App.css'
import {useDeleteProperty, useDeleteRoom, useProperties} from "../lib/helpers/hooks"
import {Property, Room} from "../lib/helpers/types"
import {useState} from "react"
import {PropertyAddEdit} from "./components/Properties/PropertyAddEdit"
import {RoomAddEdit} from "./components/Rooms/RoomAddEdit";
import {useQueryClient} from "@tanstack/react-query";

function App() {
    const {data, isLoading} = useProperties()


    const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false)
    const [editProperty, setEditProperty] = useState<Property | undefined>(undefined)

    const [isRoomModalOpen, setIsRoomModalOpen] = useState(false)
    const [editRoom, setEditRoom] = useState<Room | undefined>(undefined)


    const openPropertyModal = (property?: Property) => {
        setEditProperty(property)
        setIsPropertyModalOpen(true)
    }

    const closePropertyModal = () => {
        setIsPropertyModalOpen(false)
    }

    const openRoomModal = (room?: Room) => {
        setEditRoom(room)
        setIsRoomModalOpen(true)
    }

    const closeRoomModal = () => {
        setIsRoomModalOpen(false)
    }

    return (
        <>
            <h1>Property Management System</h1>
            {isLoading && (<div>
                <div className="card">
                    <h2>Fetching Properties</h2>w
                </div>
            </div>)}

            <button onClick={() => openPropertyModal(undefined)}>Create New Property</button>
            {data && data.length > 0 &&  (<button onClick={() => openRoomModal(undefined)}>Create New Room</button>)}

            <PropertyAddEdit isOpen={isPropertyModalOpen} onClose={closePropertyModal} property={editProperty}/>
            <RoomAddEdit isOpen={isRoomModalOpen} onClose={closeRoomModal} room={editRoom}/>


            {data && data.length > 0 && data?.map((property: Property) => (
                <PropertyCard property={property} openModal={openPropertyModal} key={property.id}/>
            ))}

            {data && data.length === 0 && (
                <p className="text-xl p-6">You have no properties!</p>
            )}
        </>
    )
}

const PropertyCard = ({property, openModal}: {
    property: Property
    openModal: (property?: Property) => void
}) => {
    const [showRooms, setShowRooms] = useState(false)
    const deleteProperty = useDeleteProperty()
    const deleteCallback = async (property: Property) => {
        await deleteProperty.mutateAsync(property.id)
    }


    return (
        <div className="p-4">
            <div className="flex flex-col border border-white rounded-3xl p-4">
                <p>{property.name}</p>
                <p>{property.address_line_1}</p>
                <p>{property.address_line_2}</p>
                <p>{property.code}</p>
                <p>{property.county}</p>
                <p>{property.country}</p>
            </div>
            {showRooms && (
                <div className='flex flex-col items-center'>
                    {property?.rooms.map((room: Room) => (<RoomCard room={room} key={room.id}/>))}
                    {property.rooms.length === 0 && <p className="p-2">No Rooms to Show</p>}
                </div>
            )}
            <div>
                <button type="button" onClick={() => setShowRooms(!showRooms)}>{showRooms ? 'Hide' : 'Show'} Rooms
                </button>
                <button type="button" onClick={() => openModal(property)}>Edit Property</button>
                <button type="button" onClick={() => deleteCallback(property)}>Delete Property</button>
            </div>

        </div>
    )
}

const RoomCard = ({room}: { room: Room }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editRoom, setEditRoom] = useState<Room | undefined>(undefined)
    const queryClient = useQueryClient()

    const openModal = (room?: Room) => {
        setEditRoom(room)
        setIsModalOpen(true)
    }

    const deleteRoom = useDeleteRoom()
    const deleteCallback = async (room: Room) => {
        await deleteRoom.mutateAsync(room.id)
        window.location.reload()
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }


    return (
        <>
            <RoomAddEdit isOpen={isModalOpen} onClose={closeModal} room={editRoom}/>
            <div className="p-4">
                <div className="flex flex-col border border-white rounded-3xl p-4">
                    <p>{room.name}</p>
                    <p>{room.size} {room.unit_size}</p>
                </div>
                <div>
                    <button type="button" onClick={() => openModal(room)}>Edit</button>
                    <button type="button" onClick={() => deleteCallback(room)}>Delete</button>
                </div>
            </div>
        </>


    )
}


export default App
