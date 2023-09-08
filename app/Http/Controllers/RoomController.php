<?php

namespace App\Http\Controllers;

use App\Enums\UnitSize;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Support\Facades\Validator;

class RoomController extends Controller
{
    // Create a new room for a property
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'property_id' => 'required|exists:properties,id',
            'name'        => 'required|string|max:255',
            'size'        => 'required|numeric|min:1|max:200',
            'unit_size'   => ['required', 'in:Feet,Metres'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $room = Room::create($validator->getData());

        return response()->json($room, 201);
    }

    // Fetch all rooms of a specific property
    public function index($propertyId)
    {
        $rooms = Room::where('property_id', $propertyId)->get();

        return response()->json($rooms);
    }

    // Edit a specific room
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'size' => 'required|numeric|min:1|max:200',
            'unit_size' => ['required', 'in:Feet,Metres'],
        ]);


        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $room = Room::find($id);

        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        $room->update($validator->getData());

        return response()->json($room);
    }

    // Delete a specific room
    public function destroy($id)
    {
        $room = Room::find($id);

        if (!$room) {
            return response()->json(['message' => 'Room not found'], 404);
        }

        $room->delete();

        return response()->json(['message' => 'Room deleted successfully']);
    }
}
