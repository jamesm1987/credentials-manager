<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name'  
    ];

    public function credentials()
    {
        return $this->hasMany(ClientCredential::class)->with('fieldType', 'group');
    }
}
