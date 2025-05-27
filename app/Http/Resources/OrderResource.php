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
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number_order' => $this->number_order,
            'name' => $this->name,
            'contact' => $this->contact,
            'total_price' => $this->total_price,
            'type_order' => $this->type_order,
            'no_table' => $this->no_table,
            'items' => $this->items,
            'time' => $this->time,
            'time_reservation' => $this->time_reservation,
            'status' => $this->status,
            'created_at' => $this->created_at,
            
            // Include user data if available
            'user' => $this->whenLoaded('user', function () {
                return [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'email' => $this->user->email,
                    'contact' => $this->user->contact ?? null, // assuming 'contact' is a field on the User model
                ];
            }),
        ];
    }
}
