<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'number_order', 'name', 'contact', 'total_price', 'type_order',
        'no_table', 'items', 'time', 'time_reservation', 'status', 'user_id'
    ];

    public function user()
{
    return $this->belongsTo(User::class);
}

    protected $casts = [
        'items' => 'array',
        'time' => 'datetime',
        'time_reservation' => 'datetime',
    ];
}
