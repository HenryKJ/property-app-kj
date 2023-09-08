<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Property;
use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RoomControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_room()
    {
        $property = Property::factory()->create();

        $response = $this->post('/api/rooms', [
            'property_id' => $property->id,
            'name' => 'Test Room',
            'size' => 50,
            'unit_size' => 'feet',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('rooms', ['name' => 'Test Room']);
    }

    public function test_can_update_room()
    {
        $property = Property::factory()->create();
        $room = Room::factory()->for($property, 'property')->create();

        $response = $this->put("/api/rooms/{$room->id}", [
            'name' => 'Updated Room Name',
            'size' => 150,
            'unit_size' => 'metres',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('rooms', ['name' => 'Updated Room Name']);
    }

    public function test_can_delete_room()
    {
        $property = Property::factory()->create();
        $room = Room::factory()->for($property, 'property')->create();

        $response = $this->delete("/api/rooms/{$room->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('rooms', ['id' => $room->id]);
    }

    public function test_can_fetch_all_rooms_of_a_property()
    {
        $property = Property::factory()->create();
        Room::factory()->count(3)->create(['property_id' => $property->id]);

        $response = $this->get("/api/rooms/{$property->id}");

        $response->assertStatus(200);
        $response->assertJsonCount(3); // Assuming you expect 3 rooms for this property
    }
}
