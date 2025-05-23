<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
DB:
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('number_order'); // e.g. #001
            $table->string('name');
            $table->string('contact');
            $table->decimal('total_price', 10, 2);
            $table->enum('type_order', ['dine-in', 'takeaway']);
            $table->string('no_table')->nullable(); // still stored
            $table->json('items'); // store array of items
            $table->timestamp('time')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('time_reservation')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
