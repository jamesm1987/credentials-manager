<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class FieldType extends Pivot
{
    protected $table = 'field_type';
    public $incrementing = true;

    public function field()
    {
        return $this->belongsTo(Field::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }

    public function credentials()
    {
        return $this->hasMany(ClientCredential::class);
    }
}
