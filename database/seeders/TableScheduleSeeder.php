<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TableScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tables = [
            ['no_table' => 'T-01', 'persons' => 2],
            ['no_table' => 'T-02', 'persons' => 4],
            ['no_table' => 'T-03', 'persons' => 2],
            ['no_table' => 'T-04', 'persons' => 6],
            ['no_table' => 'T-05', 'persons' => 8],
            ['no_table' => 'T-06', 'persons' => 4],
        ];

        foreach ($tables as $table) {
            DB::table('table_schedules')->insert([
                'no_table' => $table['no_table'],
                'persons' => $table['persons'],
                'slot_08_10' => false,
                'slot_10_12' => false,
                'slot_12_14' => false,
                'slot_14_16' => false,
                'slot_16_18' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
