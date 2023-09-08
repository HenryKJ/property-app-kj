<?php

namespace App\Models;

use App\Enums\UnitSize;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'name',
        'size',
        'unit_size',
    ];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
