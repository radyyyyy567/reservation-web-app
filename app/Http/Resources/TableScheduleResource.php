<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TableScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'no_table'     => $this->no_table,
            'persons'      => $this->persons,
            'slot_08_10'   => $this->slot_08_10,
            'slot_10_12'   => $this->slot_10_12,
            'slot_12_14'   => $this->slot_12_14,
            'slot_14_16'   => $this->slot_14_16,
            'slot_16_18'   => $this->slot_16_18,
            'created_at'   => $this->created_at,
            'updated_at'   => $this->updated_at,
        ];
    }
}
