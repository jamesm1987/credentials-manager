<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $table = 'credential_groups';

    protected $fillable = [
        'name',
        'label',
        'description',
    ];

    public function clientCredentials()
    {
        return $this->hasMany(ClientCredential::class);
    }
}
