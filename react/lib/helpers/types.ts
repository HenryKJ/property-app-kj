export type Property = {
    id: number
    name: string
    address_line_1: string
    address_line_2: string
    code: string
    country: string
    county: string
    rooms: Room[]
    created_at: string
    updated_at: string | null
}

export type Room = {
    id: number;
    property_id: number;
    name: string;
    size: number;
    unit_size: UnitSize
}


enum UnitSize {
    Feet = 'Feet',
    Metres = 'Metres',
}

