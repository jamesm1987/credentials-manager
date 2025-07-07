<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CredentialsGroupedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->groupBy(fn($cred) => $cred->group->name ?? 'Ungrouped')
            ->mapWithKeys(function ($groupCredentials, $groupName) {
                return [
                    $groupName => $groupCredentials
                        ->groupBy(fn($cred) => $cred->fieldType->type->name ?? 'Unknown')
                        ->mapWithKeys(function ($typeCredentials, $typeName) {
                            // Merge all key-value pairs from each credential
                            $fields = [];

                            foreach ($typeCredentials as $cred) {
                                $key = $cred->fieldType->field->name ?? 'field';
                                $fields[$key] = $cred->value;
                            }

                            return [$typeName => $fields];
                        })
                        ->toArray(),
                ];
            })
            ->toArray();
    }
}
