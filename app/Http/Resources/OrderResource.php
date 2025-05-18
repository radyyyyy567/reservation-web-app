<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'number_order'     => $this->number_order,
            'name'             => $this->name,
            'contact'          => $this->contact,
            'type_order'       => $this->type_order,
            'no_table'         => $this->no_table,
            'total_price'      => $this->total_price,
            'status'           => $this->status,
            'items'            => $this->items,
            'time'             => $this->time?->toDateTimeString(),
            'time_reservation' => $this->time_reservation?->toDateTimeString(),
            'created_at'       => $this->created_at->toDateTimeString(),
            'updated_at'       => $this->updated_at->toDateTimeString(),
        ];
    }
}
