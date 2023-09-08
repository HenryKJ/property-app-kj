<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Property;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PropertyControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_property()
    {
        $response = $this->post('/api/properties', [
            'name' => 'Test Property',
            'address_line_1' => '123 Test Street',
            'address_line_2' => 'Apt 4B',
            'code' => 'AB123',
            'county' => 'Test County',
            'country' => 'United Kingdom',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('properties', [
            'name' => 'Test Property',
            'address_line_1' => '123 Test Street',
            'address_line_2' => 'Apt 4B',
            'code' => 'AB123',
            'county' => 'Test County',
            'country' => 'United Kingdom',
        ]);
    }

    public function test_can_update_property()
    {
        $property = Property::factory()->create();

        $response = $this->put("/api/properties/{$property->id}", [
            'name' => 'Updated Property Name',
            'address_line_1' => '456 Updated Street',
            'address_line_2' => 'Apt 5C',
            'code' => 'CD456',
            'county' => 'Updated County',
            'country' => 'United States',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('properties', [
            'name' => 'Updated Property Name',
            'address_line_1' => '456 Updated Street',
            'address_line_2' => 'Apt 5C',
            'code' => 'CD456',
            'county' => 'Updated County',
            'country' => 'United States',
        ]);
    }

    public function test_can_delete_property()
    {
        $property = Property::factory()->create();

        $response = $this->delete("/api/properties/{$property->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('properties', ['id' => $property->id]);
    }

    public function test_can_fetch_all_properties()
    {
        Property::factory()->count(3)->create();

        $response = $this->get('/api/properties');

        $response->assertStatus(200);
        $response->assertJsonCount(3); // Assuming you expect 3 properties
    }
}
