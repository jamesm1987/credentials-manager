<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClientCredential extends Model
{
    
    protected $fillable = ['client_id', 'field_type_id', 'value'];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function fieldType()
    {
        return $this->belongsTo(FieldType::class);
    }

    public function group()
    {
        return $this->belongsTo(Group::class, 'credential_group_id');
    }
}
