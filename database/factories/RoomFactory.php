<?php

namespace Database\Factories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory
{
    protected $model = Room::class;

    public function definition()
    {
        return [
            'property_id' => $this->faker->numberBetween(1, 10), // Adjust the range as needed
            'name' => $this->faker->word,
            'size' => $this->faker->randomNumber([1, 200]),
            'unit_size' => $this->faker->randomElement(['Feet', 'Metres']),
        ];
    }
}
