<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $fillable = [
        'name',
    ];

    public function fields() 
    {
        return $this->belongsToMany(Field::class, 'field_type', 'type_id', 'field_id');
    }
}
