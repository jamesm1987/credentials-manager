<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    protected $fillable = [
        'label',
        'name',
        'type',
    ];

    public function types()
    {
        return $this->belongsToMany(Type::class, 'field_type')
            ->using(FieldType::class)
            ->withTimestamps();
    }
}
