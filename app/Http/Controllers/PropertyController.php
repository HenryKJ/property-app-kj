<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    // Create a new property
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'code' => 'required|string|max:255',
            'county' => 'required|string|max:255',
            'country' => 'string|max:255|nullable',
        ]);

        $property = Property::create($validatedData);

        return response()->json($property, 201);
    }

    // Fetch all properties
    public function index()
    {
        $properties = Property::query()->with('rooms')->orderBy('id', 'desc')->get();

        return response()->json($properties);
    }

    // Edit a specific property
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'code' => 'required|string|max:255',
            'county' => 'required|string|max:255',
            'country' => 'string|max:255|nullable',
        ]);

        $property = Property::find($id);

        if (!$property) {
            return response()->json(['message' => 'Property not found'], 404);
        }

        $property->update($validatedData);

        return response()->json($property);
    }

    // Delete a specific property
    public function destroy($id)
    {
        $property = Property::find($id);

        if (!$property) {
            return response()->json(['message' => 'Property not found'], 404);
        }

        $property->delete();

        return response()->json(['message' => 'Property deleted successfully']);
    }
}
