<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('table_schedules', function (Blueprint $table) {
            $table->id();
            $table->string('no_table');
            $table->string('persons');
            $table->boolean('slot_08_10')->default(false);
            $table->boolean('slot_10_12')->default(false);
            $table->boolean('slot_12_14')->default(false);
            $table->boolean('slot_14_16')->default(false);
            $table->boolean('slot_16_18')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_schedules');
    }
};
