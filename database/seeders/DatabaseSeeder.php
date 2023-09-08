<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Models\Room;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Property::factory(10)->create(); // Create 10 fake properties
        Room::factory(20)->create(); // Create 20 fake rooms
    }
}
