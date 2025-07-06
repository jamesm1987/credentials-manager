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

    public function getGroupedCredentialsAttribute()
    {
        return $this->credentials
            ->groupBy(fn ($cred) => $cred->group->name ?? 'Ungrouped');
    }
    

    public function groupedCredentialsByType()
    {
        return $this->credentials
            ->groupBy(fn ($cred) => $cred->group->name ?? 'Ungrouped')
            ->map(function ($groupCredentials) {
                return $groupCredentials
                    ->groupBy(fn ($cred) => $cred->fieldType->name ?? 'Unknown')
                    ->map(function ($typeCredentials, $typeName) {
                        return [
                            'type' => $typeName,
                            'fields' => $typeCredentials->map(fn ($cred) => [
                                'label' => $cred->fieldType->label ?? 'Field', // or use a field name if exists
                                'value' => $cred->value,
                            ])->values(),
                        ];
                    })->values();
            })
            ->map(function ($types, $groupName) {
                return [
                    'group' => $groupName,
                    'types' => $types,
                ];
            })->values();
    }
}
