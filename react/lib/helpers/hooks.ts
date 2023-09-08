import {useRestDelete, useRestGet, useRestStore} from "./rest-hooks";
import {Property, Room} from "./types";

const useProperties = () => useRestGet<Property[]>('properties')
const useSaveProperty = () => useRestStore('properties', [['properties']])
const useDeleteProperty = () => useRestDelete('properties', [['properties']])

const useRooms = (id: number) => useRestGet<Room[]>(`rooms/` + id)
const useSaveRoom = () => useRestStore('rooms', [['rooms']])
const useDeleteRoom = () => useRestDelete('rooms')

export { useProperties, useSaveProperty, useDeleteProperty, useRooms, useSaveRoom, useDeleteRoom }
