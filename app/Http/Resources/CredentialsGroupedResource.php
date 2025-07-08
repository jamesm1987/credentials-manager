<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CredentialsGroupedResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return $this->groupBy(fn($cred) => $cred->group->name ?? 'Ungrouped')
            ->mapWithKeys(function ($groupCredentials, $groupName) {
                return [
                    $groupName => $groupCredentials
                        ->groupBy(fn($cred) => $cred->fieldType->type->name ?? 'Unknown')
                        ->map(function ($typeCredentials) {
                            return $typeCredentials->map(function ($cred) {
                                return [
                                    'id' => $cred->id,
                                    'field_type' => $cred->fieldType->field->name ?? 'field',
                                    'value' => $cred->value,
                                ];
                            })->values();
                        })
                        ->toArray(),
                ];
            })
            ->toArray();
    }
}
