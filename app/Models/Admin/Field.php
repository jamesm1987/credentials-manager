<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    protected $fillable = [
        
    ];

    public function fields() 
    {
        return $this->belongsToMany(Type::class, 'field_type', 'field_id', 'type_id');
    }
}
